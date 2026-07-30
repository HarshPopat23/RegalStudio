import { ID } from "appwrite";
import { storage } from "../lib/appwrite";
import { appwriteConfig } from "../config/appwriteConfig";

export const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function validateImage(file) {
  if (!file) throw new Error("Please select an image.");
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only JPG, PNG and WebP images are supported.");
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Image is too large. Maximum size is 2 MB.");
  }
}

export async function uploadImage(file) {
  validateImage(file);
  return storage.createFile({
    bucketId: appwriteConfig.storageBucketId,
    fileId: ID.unique(),
    file,
  });
}

export async function deleteImage(fileId) {
  if (!fileId) return;
  await storage.deleteFile({
    bucketId: appwriteConfig.storageBucketId,
    fileId,
  });
}

export function getImageUrl(fileId) {
  if (!fileId) return "";
  return storage.getFileView({
    bucketId: appwriteConfig.storageBucketId,
    fileId,
  }).toString();
}
