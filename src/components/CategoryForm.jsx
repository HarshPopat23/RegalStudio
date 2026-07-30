import { useEffect, useState } from "react";
import { createSlug } from "../utils/helpers";
import { validateImage } from "../services/imageService";

const empty = { name: "", description: "", isActive: true, displayOrder: 1, coverFile: null };

export default function CategoryForm({ initial, onSave, onCancel, submitting }) {
  const [data, setData] = useState(empty);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    setData(initial || empty);
    setPreview(initial?.coverImage || "");
  }, [initial]);

  useEffect(() => () => {
    if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
  }, [preview]);

  const selectImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      validateImage(file);
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
      setData((current) => ({ ...current, coverFile: file }));
      setPreview(URL.createObjectURL(file));
      setError("");
    } catch (imageError) {
      event.target.value = "";
      setError(imageError.message);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    if (!data.name.trim() || !data.description.trim() || (!initial && !data.coverFile)) {
      setError("Name, description and a cover image are required.");
      return;
    }
    onSave({
      ...data,
      slug: createSlug(data.name),
      displayOrder: Number(data.displayOrder),
      createdAt: data.createdAt || new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={submit} className="rounded-3xl border border-[#e6d4b8] bg-white p-6 shadow-sm">
      <h3 className="text-2xl text-[#551729]">{initial ? "Edit" : "Create"} category</h3>
      {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Category name"><input required className="admin-input" value={data.name} onChange={(event) => setData({ ...data, name: event.target.value })} /></Field>
        <Field label="Display order"><input required type="number" min="1" className="admin-input" value={data.displayOrder} onChange={(event) => setData({ ...data, displayOrder: event.target.value })} /></Field>
        <Field wide label="Description"><textarea required className="admin-input min-h-24" value={data.description} onChange={(event) => setData({ ...data, description: event.target.value })} /></Field>
        <Field wide label={`Cover image ${initial ? "(leave empty to keep current image)" : ""}`}><input required={!initial} type="file" accept=".jpg,.jpeg,.png,.webp" className="admin-input" onChange={selectImage} /></Field>
        <label className="flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={data.isActive} onChange={(event) => setData({ ...data, isActive: event.target.checked })} /> Active category</label>
      </div>
      {preview && <img src={preview} alt="Category preview" className="mt-5 h-36 w-full rounded-xl object-cover" />}
      <div className="mt-6 flex gap-3">
        <button disabled={submitting} className="rounded-xl bg-[#a73524] px-5 py-2.5 font-bold text-white disabled:opacity-60">{submitting ? "Saving…" : "Save category"}</button>
        <button disabled={submitting} type="button" onClick={onCancel} className="rounded-xl border px-5 py-2.5 font-bold">Cancel</button>
      </div>
    </form>
  );
}

function Field({ label, wide, children }) {
  return <label className={`grid gap-2 text-sm font-bold ${wide ? "sm:col-span-2" : ""}`}>{label}{children}</label>;
}
