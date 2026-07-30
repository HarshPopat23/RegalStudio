export const createSlug = (value="") => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const formatPrice = (price) => new Intl.NumberFormat("en-IN", { maximumFractionDigits:0 }).format(Number(price || 0));
export const categoryName = (categories, id) => categories.find(c => c.id === id)?.name || "Uncategorized";
