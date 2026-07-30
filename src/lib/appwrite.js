import { Account, Client, Storage, TablesDB } from "appwrite";
import { appwriteConfig } from "../config/appwriteConfig";

export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId || "missing-project-id");

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);
