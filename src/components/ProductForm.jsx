import { useEffect, useState } from "react";
import { createSlug } from "../utils/helpers";
import { validateImage } from "../services/imageService";

const empty = {
  categoryId: "", name: "", productCode: "", description: "", price: "",
  dimensions: "", material: "", imageFile: null, isAvailable: true, isFeatured: false,
};

export default function ProductForm({ initial, categories, onSave, onCancel, submitting }) {
  const [data, setData] = useState(empty);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    setData(initial || { ...empty, categoryId: categories[0]?.id || "" });
    setPreview(initial?.image || "");
  }, [initial, categories]);

  useEffect(() => () => {
    if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
  }, [preview]);

  const selectImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      validateImage(file);
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
      setData((current) => ({ ...current, imageFile: file }));
      setPreview(URL.createObjectURL(file));
      setError("");
    } catch (imageError) {
      event.target.value = "";
      setError(imageError.message);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    const required = ["categoryId", "name", "productCode", "description", "price", "dimensions", "material"];
    if (required.some((key) => !String(data[key] || "").trim()) || (!initial && !data.imageFile)) {
      setError("Please complete every required field and select an image.");
      return;
    }
    onSave({
      ...data,
      slug: createSlug(data.name),
      price: Number(data.price),
      createdAt: data.createdAt || new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={submit} className="rounded-3xl border border-[#e6d4b8] bg-white p-6 shadow-sm">
      <h3 className="text-2xl text-[#551729]">{initial ? "Edit" : "Add"} product</h3>
      {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Category"><select required className="admin-input" value={data.categoryId} onChange={(event) => setData({ ...data, categoryId: event.target.value })}><option value="">Select category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></Field>
        <Field label="Product name"><input required className="admin-input" value={data.name} onChange={(event) => setData({ ...data, name: event.target.value })} /></Field>
        <Field label="Product code"><input required className="admin-input" value={data.productCode} onChange={(event) => setData({ ...data, productCode: event.target.value })} /></Field>
        <Field label="Price (₹)"><input required type="number" min="0" className="admin-input" value={data.price} onChange={(event) => setData({ ...data, price: event.target.value })} /></Field>
        <Field label="Dimensions"><input required className="admin-input" value={data.dimensions} onChange={(event) => setData({ ...data, dimensions: event.target.value })} /></Field>
        <Field label="Material"><input required className="admin-input" value={data.material} onChange={(event) => setData({ ...data, material: event.target.value })} /></Field>
        <Field wide label="Description"><textarea required className="admin-input min-h-24" value={data.description} onChange={(event) => setData({ ...data, description: event.target.value })} /></Field>
        <Field wide label={`Product image, JPG/PNG/WebP, max 2 MB ${initial ? "(leave empty to keep current image)" : ""}`}><input required={!initial} type="file" accept=".jpg,.jpeg,.png,.webp" className="admin-input" onChange={selectImage} /></Field>
        <label className="flex gap-3 text-sm font-bold"><input type="checkbox" checked={data.isAvailable} onChange={(event) => setData({ ...data, isAvailable: event.target.checked })} /> Available</label>
        <label className="flex gap-3 text-sm font-bold"><input type="checkbox" checked={data.isFeatured} onChange={(event) => setData({ ...data, isFeatured: event.target.checked })} /> Featured</label>
      </div>
      {preview && <img src={preview} alt="Product preview" className="mt-5 h-44 w-full rounded-xl object-cover" />}
      <div className="mt-6 flex gap-3">
        <button disabled={submitting} className="rounded-xl bg-[#a73524] px-5 py-2.5 font-bold text-white disabled:opacity-60">{submitting ? "Saving…" : "Save product"}</button>
        <button disabled={submitting} type="button" onClick={onCancel} className="rounded-xl border px-5 py-2.5 font-bold">Cancel</button>
      </div>
    </form>
  );
}

function Field({ label, wide, children }) {
  return <label className={`grid gap-2 text-sm font-bold ${wide ? "sm:col-span-2" : ""}`}>{label}{children}</label>;
}
