# Appwrite setup for Regal Studio

Complete these steps in the Appwrite Console before running the application.

## 1. Create the project and platforms

1. Create an Appwrite Cloud project.
2. Add a **Web app** platform for `localhost`.
3. After deploying, add another Web platform for your Vercel domain.
4. Later add `regalprint1.com` and `www.regalprint1.com` as Web platforms.

## 2. Create the administrator

1. Open **Auth → Users**.
2. Create one email/password user for the client.
3. Copy the user ID into `VITE_APPWRITE_ADMIN_USER_ID`.
4. Do not add a public registration page.
5. In Auth settings, keep only the authentication methods you use.

The application checks both the Appwrite session and the configured administrator
user ID. Signing in with another valid Appwrite user will not grant dashboard access.

## 3. Create the database

Create one database and copy its ID into `VITE_APPWRITE_DATABASE_ID`.

### Categories collection

Create a collection and copy its ID into
`VITE_APPWRITE_CATEGORIES_COLLECTION_ID`.

Create these attributes:

| Attribute | Type | Size | Required | Default |
| --- | --- | ---: | --- | --- |
| `name` | String | 120 | Yes | — |
| `slug` | String | 140 | Yes | — |
| `description` | String | 2000 | Yes | — |
| `coverImageId` | String | 64 | No | empty |
| `coverImageUrl` | String | 2048 | No | empty |
| `isActive` | Boolean | — | Yes | `true` |
| `displayOrder` | Integer | — | Yes | `1` |
| `createdAt` | Datetime | — | Yes | — |

Create a **unique** key index for `slug`.

### Products collection

Create a collection and copy its ID into
`VITE_APPWRITE_PRODUCTS_COLLECTION_ID`.

Create these attributes:

| Attribute | Type | Size | Required | Default |
| --- | --- | ---: | --- | --- |
| `categoryId` | String | 64 | Yes | — |
| `name` | String | 160 | Yes | — |
| `slug` | String | 180 | Yes | — |
| `productCode` | String | 80 | Yes | — |
| `description` | String | 4000 | Yes | — |
| `price` | Float | — | Yes | — |
| `dimensions` | String | 160 | Yes | — |
| `material` | String | 200 | Yes | — |
| `imageId` | String | 64 | No | empty |
| `imageUrl` | String | 2048 | No | empty |
| `isAvailable` | Boolean | — | Yes | `true` |
| `isFeatured` | Boolean | — | Yes | `false` |
| `createdAt` | Datetime | — | Yes | — |

Create:

- A unique key index for `slug`.
- A unique key index for `productCode`.
- A key index for `categoryId`.

## 4. Collection permissions

For both collections:

- Disable **Document Security**.
- Grant **Read** to `Any`.
- Grant **Create**, **Update** and **Delete** to the specific administrator
  `User` selected by user ID.

Do not grant write permissions to the broad `Users` role. Selecting the exact
administrator user ID keeps writes protected even if another account exists.

## 5. Create the image bucket

Create one Storage bucket and copy its ID into
`VITE_APPWRITE_STORAGE_BUCKET_ID`.

Recommended settings:

- Maximum file size: `2 MB`
- Allowed extensions: `jpg`, `jpeg`, `png`, `webp`
- Encryption: enabled
- Antivirus: enabled when available
- File Security: disabled

Bucket permissions:

- **Read**: `Any`
- **Create**, **Update**, **Delete**: the specific administrator `User` ID

Public read access is necessary because product images appear in the public catalog.
Original print-ready artwork should never be uploaded to this public-preview bucket.

## 6. Environment file

Copy `.env.example` to `.env`:

```env
VITE_APPWRITE_ENDPOINT=https://YOUR_REGION.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_CATEGORIES_COLLECTION_ID=your_categories_collection_id
VITE_APPWRITE_PRODUCTS_COLLECTION_ID=your_products_collection_id
VITE_APPWRITE_STORAGE_BUCKET_ID=your_bucket_id
VITE_APPWRITE_ADMIN_USER_ID=your_admin_user_id
VITE_WHATSAPP_NUMBER=919876543210
VITE_INSTAGRAM_URL=https://instagram.com/regalstudio
```

Use the exact regional endpoint displayed in the Appwrite Console.

## 7. First catalog content

After configuring `.env`:

1. Run `npm run dev`.
2. Open `/admin/login`.
3. Sign in with the Appwrite admin account.
4. Create categories first.
5. Add products to those categories.

All changes are stored in Appwrite and become visible to every visitor.

## Security boundaries

- Vite variables are visible in the browser. Project and resource IDs are safe to
  expose; API keys and passwords are not.
- Never put an Appwrite API key in a `VITE_` variable.
- Never store the administrator password in source code or Vercel variables.
- Collection and bucket permissions are the real authorization boundary.
