import { account } from "../lib/appwrite";
import { appwriteConfig, validateAppwriteConfig } from "../config/appwriteConfig";

function assertAdmin(user) {
  if (user.$id !== appwriteConfig.adminUserId) {
    throw new Error("This account is not authorized to access the admin dashboard.");
  }
  return user;
}

export async function getCurrentAdmin() {
  validateAppwriteConfig();
  try {
    const user = await account.get();
    return assertAdmin(user);
  } catch {
    return null;
  }
}

export async function loginAdmin(email, password) {
  validateAppwriteConfig();
  await account.createEmailPasswordSession({ email, password });
  try {
    const user = await account.get();
    return assertAdmin(user);
  } catch (error) {
    await account.deleteSession({ sessionId: "current" }).catch(() => {});
    throw error;
  }
}

export async function logoutAdmin() {
  await account.deleteSession({ sessionId: "current" });
}
