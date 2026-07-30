import { useState } from "react";
import { useStore } from "../hooks/useStore";
import { createCategory, deleteCategory, updateCategory } from "../services/catalogService";
import CategoryForm from "../components/CategoryForm";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";

export default function AdminCategories() {
  const { categories, products, loading, error, refresh } = useStore();
  const [form, setForm] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [submitting, setSubmitting] = useState(false);

  const flash = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 2600);
  };

  const save = async (data) => {
    setSubmitting(true);
    try {
      if (form?.id) await updateCategory(data);
      else await createCategory(data);
      await refresh();
      setForm(null);
      flash("Category saved successfully.");
    } catch (saveError) {
      flash(saveError.message || "Unable to save category.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async () => {
    setSubmitting(true);
    try {
      await deleteCategory(deleting, products);
      await refresh();
      setDeleting(null);
      flash("Category and its products were deleted.");
    } catch (deleteError) {
      flash(deleteError.message || "Unable to delete category.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const toggle = async (category) => {
    try {
      await updateCategory({ ...category, isActive: !category.isActive });
      await refresh();
      flash("Category status updated.");
    } catch (toggleError) {
      flash(toggleError.message || "Unable to update category.", "error");
    }
  };

  return (
    <div>
      <Toast message={toast.message} type={toast.type} />
      <div className="flex items-end justify-between gap-4">
        <div><p className="text-sm text-[#806a5d]">Organize your occasions</p><h2 className="text-3xl text-[#511526]">Categories</h2></div>
        <button onClick={() => setForm({})} className="rounded-xl bg-[#a73524] px-4 py-2.5 font-bold text-white">+ New category</button>
      </div>
      {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700">{error}</p>}
      {form && <div className="mt-6"><CategoryForm initial={form.id ? form : null} onSave={save} onCancel={() => setForm(null)} submitting={submitting} /></div>}
      <div className="mt-7 overflow-x-auto rounded-2xl border border-[#e5d3b7] bg-white">
        {loading ? <p className="p-10 text-center">Loading categories…</p> : (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#f6ead7] text-[#604235]"><tr><th className="p-4">Category</th><th>Order</th><th>Status</th><th>Products</th><th className="p-4 text-right">Actions</th></tr></thead>
            <tbody>{categories.map((category) => (
              <tr key={category.id} className="border-t border-[#eee2d0]">
                <td className="p-4"><div className="flex items-center gap-3"><img src={category.coverImage} className="h-12 w-16 rounded-lg object-cover" alt="" /><b>{category.name}</b></div></td>
                <td>{category.displayOrder}</td>
                <td><button onClick={() => toggle(category)} className={`rounded-full px-3 py-1 text-xs font-bold ${category.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>{category.isActive ? "Active" : "Disabled"}</button></td>
                <td>{products.filter((product) => product.categoryId === category.id).length}</td>
                <td className="p-4 text-right"><button onClick={() => setForm(category)} className="mr-3 font-bold text-[#126373]">Edit</button><button onClick={() => setDeleting(category)} className="font-bold text-red-700">Delete</button></td>
              </tr>
            ))}</tbody>
          </table>
        )}
        {!loading && !categories.length && <p className="p-10 text-center">No categories yet.</p>}
      </div>
      <ConfirmModal open={!!deleting} title="Delete category?" copy="This will permanently delete the category, all its products and their uploaded images." onCancel={() => setDeleting(null)} onConfirm={remove} />
    </div>
  );
}
