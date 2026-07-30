import { useState } from "react";
import { useStore } from "../hooks/useStore";
import { createProduct, deleteProduct, updateProduct } from "../services/catalogService";
import ProductForm from "../components/ProductForm";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import { categoryName, formatPrice } from "../utils/helpers";

export default function AdminProducts() {
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
      if (form?.id) await updateProduct(data);
      else await createProduct(data);
      await refresh();
      setForm(null);
      flash("Product saved successfully.");
    } catch (saveError) {
      flash(saveError.message || "Unable to save product.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async () => {
    setSubmitting(true);
    try {
      await deleteProduct(deleting);
      await refresh();
      setDeleting(null);
      flash("Product deleted.");
    } catch (deleteError) {
      flash(deleteError.message || "Unable to delete product.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const toggle = async (product) => {
    try {
      await updateProduct({ ...product, isAvailable: !product.isAvailable });
      await refresh();
      flash("Availability updated.");
    } catch (toggleError) {
      flash(toggleError.message || "Unable to update product.", "error");
    }
  };

  return (
    <div>
      <Toast message={toast.message} type={toast.type} />
      <div className="flex items-end justify-between gap-4">
        <div><p className="text-sm text-[#806a5d]">Your design catalog</p><h2 className="text-3xl text-[#511526]">Products</h2></div>
        <button disabled={!categories.length} onClick={() => setForm({})} className="rounded-xl bg-[#a73524] px-4 py-2.5 font-bold text-white disabled:opacity-40">+ Add product</button>
      </div>
      {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700">{error}</p>}
      {form && <div className="mt-6"><ProductForm initial={form.id ? form : null} categories={categories} onSave={save} onCancel={() => setForm(null)} submitting={submitting} /></div>}
      <div className="mt-7 overflow-x-auto rounded-2xl border border-[#e5d3b7] bg-white">
        {loading ? <p className="p-10 text-center">Loading products…</p> : (
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-[#f6ead7] text-[#604235]"><tr><th className="p-4">Product</th><th>Category</th><th>Price</th><th>Status</th><th>Featured</th><th className="p-4 text-right">Actions</th></tr></thead>
            <tbody>{products.map((product) => (
              <tr key={product.id} className="border-t border-[#eee2d0]">
                <td className="p-4"><div className="flex items-center gap-3"><img src={product.image} className="h-14 w-14 rounded-lg object-cover" alt="" /><span><b className="block">{product.name}</b><small>{product.productCode}</small></span></div></td>
                <td>{categoryName(categories, product.categoryId)}</td>
                <td>₹{formatPrice(product.price)}</td>
                <td><button onClick={() => toggle(product)} className={`rounded-full px-3 py-1 text-xs font-bold ${product.isAvailable ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>{product.isAvailable ? "Available" : "Disabled"}</button></td>
                <td>{product.isFeatured ? "★ Yes" : "—"}</td>
                <td className="p-4 text-right"><button onClick={() => setForm(product)} className="mr-3 font-bold text-[#126373]">Edit</button><button onClick={() => setDeleting(product)} className="font-bold text-red-700">Delete</button></td>
              </tr>
            ))}</tbody>
          </table>
        )}
        {!loading && !products.length && <p className="p-10 text-center">No products yet.</p>}
      </div>
      <ConfirmModal open={!!deleting} title="Delete product?" copy="This product and its uploaded image will be permanently removed." onCancel={() => setDeleting(null)} onConfirm={remove} />
    </div>
  );
}
