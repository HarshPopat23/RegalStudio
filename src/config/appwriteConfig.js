export const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  categoriesCollectionId: import.meta.env.VITE_APPWRITE_CATEGORIES_COLLECTION_ID,
  productsCollectionId: import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID,
  storageBucketId: import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID,
  adminUserId: import.meta.env.VITE_APPWRITE_ADMIN_USER_ID,
};

export function validateAppwriteConfig() {
  const missing = Object.entries(appwriteConfig)
    .filter(([key, value]) => key !== "endpoint" && !value)
    .map(([key]) => key);

  if (missing.length) {
    throw new Error(`Missing Appwrite configuration: ${missing.join(", ")}`);
  }
}
