import { ID, Query } from "appwrite";
import { tablesDB } from "../lib/appwrite";
import { appwriteConfig, validateAppwriteConfig } from "../config/appwriteConfig";
import { deleteImage, getImageUrl, uploadImage } from "./imageService";

const categoryTable = () => ({
  databaseId: appwriteConfig.databaseId,
  tableId: appwriteConfig.categoriesCollectionId,
});
const productTable = () => ({
  databaseId: appwriteConfig.databaseId,
  tableId: appwriteConfig.productsCollectionId,
});

const clean = (document) => {
  const result = {};
  for (const [key, value] of Object.entries(document)) {
    if (!key.startsWith("$")) result[key] = value;
  }
  return result;
};

const mapCategory = (document) => ({
  ...clean(document),
  id: document.$id,
  coverImage: document.coverImageId
    ? getImageUrl(document.coverImageId)
    : document.coverImageUrl || "",
});

const mapProduct = (document) => ({
  ...clean(document),
  id: document.$id,
  image: document.imageId
    ? getImageUrl(document.imageId)
    : document.imageUrl || "",
});

export async function getCategories() {
  validateAppwriteConfig();
  const response = await tablesDB.listRows({
    ...categoryTable(),
    queries: [Query.limit(100)],
  });
  return response.rows.map(mapCategory).sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getProducts() {
  validateAppwriteConfig();
  const response = await tablesDB.listRows({
    ...productTable(),
    queries: [Query.limit(100)],
  });
  return response.rows.map(mapProduct).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
}

export async function createCategory(data) {
  const uploaded = await uploadImage(data.coverFile);
  try {
    const document = await tablesDB.createRow({
      ...categoryTable(),
      rowId: ID.unique(),
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        coverImageId: uploaded.$id,
        coverImageUrl: "",
        isActive: data.isActive,
        displayOrder: data.displayOrder,
        createdAt: data.createdAt,
      },
    });
    return mapCategory(document);
  } catch (error) {
    await deleteImage(uploaded.$id).catch(() => {});
    throw error;
  }
}

export async function updateCategory(data) {
  let uploaded = null;
  if (data.coverFile) uploaded = await uploadImage(data.coverFile);
  try {
    const document = await tablesDB.updateRow({
      ...categoryTable(),
      rowId: data.id,
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        coverImageId: uploaded?.$id || data.coverImageId || "",
        coverImageUrl: uploaded ? "" : data.coverImageUrl || "",
        isActive: data.isActive,
        displayOrder: data.displayOrder,
        createdAt: data.createdAt,
      },
    });
    if (uploaded && data.coverImageId) await deleteImage(data.coverImageId).catch(() => {});
    return mapCategory(document);
  } catch (error) {
    if (uploaded) await deleteImage(uploaded.$id).catch(() => {});
    throw error;
  }
}

export async function deleteCategory(category, products) {
  const related = products.filter((product) => product.categoryId === category.id);
  for (const product of related) await deleteProduct(product);
  await tablesDB.deleteRow({ ...categoryTable(), rowId: category.id });
  await deleteImage(category.coverImageId).catch(() => {});
}

export async function createProduct(data) {
  const uploaded = await uploadImage(data.imageFile);
  try {
    const document = await tablesDB.createRow({
      ...productTable(),
      rowId: ID.unique(),
      data: {
        categoryId: data.categoryId,
        name: data.name,
        slug: data.slug,
        productCode: data.productCode,
        description: data.description,
        price: data.price,
        dimensions: data.dimensions,
        material: data.material,
        imageId: uploaded.$id,
        imageUrl: "",
        isAvailable: data.isAvailable,
        isFeatured: data.isFeatured,
        createdAt: data.createdAt,
      },
    });
    return mapProduct(document);
  } catch (error) {
    await deleteImage(uploaded.$id).catch(() => {});
    throw error;
  }
}

export async function updateProduct(data) {
  let uploaded = null;
  if (data.imageFile) uploaded = await uploadImage(data.imageFile);
  try {
    const document = await tablesDB.updateRow({
      ...productTable(),
      rowId: data.id,
      data: {
        categoryId: data.categoryId,
        name: data.name,
        slug: data.slug,
        productCode: data.productCode,
        description: data.description,
        price: data.price,
        dimensions: data.dimensions,
        material: data.material,
        imageId: uploaded?.$id || data.imageId || "",
        imageUrl: uploaded ? "" : data.imageUrl || "",
        isAvailable: data.isAvailable,
        isFeatured: data.isFeatured,
        createdAt: data.createdAt,
      },
    });
    if (uploaded && data.imageId) await deleteImage(data.imageId).catch(() => {});
    return mapProduct(document);
  } catch (error) {
    if (uploaded) await deleteImage(uploaded.$id).catch(() => {});
    throw error;
  }
}

export async function deleteProduct(product) {
  await tablesDB.deleteRow({ ...productTable(), rowId: product.id });
  await deleteImage(product.imageId).catch(() => {});
}
