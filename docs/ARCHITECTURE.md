# System Architecture & Contracts — tapp

## Overview
**tapp** is a product discovery and community showcase platform designed for public browsing, user submissions, and administrative curation.

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Backend & Database**: Firebase (Authentication, Cloud Firestore, Cloud Storage)
- **Icons**: Lucide React
- **Deployment Target**: Vercel

## Route & Access Contract

| Route | Access Level | Description & Data Query / Action |
|---|---|---|
| `/` | Public | Homepage showcasing approved products (`status == "approved"`), hero banner, category filters, and search. |
| `/products/[id]` | Public | Dynamic product detail page: fetches product document by ID and loads associated comments (`productId == id`). |
| `/login` | Public | Sign-in form using Firebase Auth (Email/Password & Google Auth). |
| `/register` | Public | Account registration; creates `users/{uid}` profile with `role: "user"`. |
| `/submit-product` | Logged-in User | Form to upload product media to Storage (`/products/{timestamp}_{filename}`) and create Firestore document with `status: "pending"`. Redirects unauthenticated users to `/login`. |
| `/admin` | Admin Only (`role === "admin"`) | Moderation panel: queries `status == "pending"` submissions. Single-click approve (`status: "approved"`) or delete (removes Firestore doc and Storage media). Redirects non-admins to `/`. |

## End-to-End User Journey
```
1. Visitor registers at /register -> role "user" assigned in Firestore.
2. User navigates to /submit-product -> uploads screenshot/media & submits specs.
3. System saves image to Cloud Storage & inserts product with status: "pending".
4. Admin logs in -> accesses protected /admin dashboard.
5. Admin clicks "Approve" -> product status updates to "approved".
6. Product instantly surfaces on homepage catalog (/) and dynamic detail page (/products/[id]).
7. Public users leave comments & questions on the product detail page.
```

## Security Boundaries & Rules
- **Firestore Security Rules**:
  - `products`: Public read for `status == "approved"`; owner can read their own pending; admins can read all; authenticated users can create with `status: "pending"`; admins can update `status` or delete.
  - `users`: Authenticated user can read/write their own profile doc. Admins can view/edit roles.
  - `comments`: Public read; authenticated users can write new comments.
- **Storage Security Rules**:
  - Limit uploads to image MIME types (`image/jpeg`, `image/png`, `image/webp`) with maximum file size (2 MB).
