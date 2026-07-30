import { Account, Client, Databases, Storage } from "appwrite";
import { appwriteConfig } from "../config/appwriteConfig";

export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId || "missing-project-id");

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
