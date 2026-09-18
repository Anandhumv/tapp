# System Architecture & Contracts ?" tapp

## Overview
**tapp** is a curated product discovery and showcase platform: public visitors browse the directory, leave comments, and reach the team via Services/Contact inquiries, while a single admin account privately manages the catalog. Public self-registration and public product submission were removed after Day 6 in favor of an admin-curated model — see the Route & Access Contract below.

## Repository Structure (Client & Server)
The repository is structured with explicit separation of frontend (client) and backend (server) domains:

```
tapp/
├── client/                     # Next.js frontend application (App Router)
│   ├── app/                    # Routes and pages (/, /products/[id], /admin/add-project, etc.)
│   ├── components/             # Reusable UI components (Navbar, Footer, ProductCard)
│   ├── lib/                    # Client Firebase SDK initialization (firebase.js)
│   ├── public/                 # Static assets, icons, and logos
│   ├── .env.local.example      # Client-side environment variable specifications
│   ├── jsconfig.json           # Path mappings and compiler options
│   ├── next.config.mjs         # Next.js build configuration
│   ├── package.json            # Client dependencies (Next.js, React, Lucide, Tailwind)
│   └── postcss.config.mjs      # Tailwind CSS PostCSS plugin configuration
├── server/                     # Backend services, admin tooling, and automation
│   ├── src/
│   │   ├── firebaseAdmin.js    # Firebase Admin SDK privileged client
│   │   ├── seed.js             # Database seeding utility for starter products
│   │   └── index.js            # Server entry point
│   ├── .env.example            # Backend / Service Account environment specification
│   └── package.json            # Server dependencies (firebase-admin, dotenv)
├── docs/                       # Shared architecture, contracts, and roadmaps
│   ├── ARCHITECTURE.md         # System design and route matrix
│   ├── CLIENT_INTAKE.md        # Client branding and questionnaire
│   ├── DATA_MODEL.md           # Firestore schemas and contracts
│   └── PLAYBOOK_ROADMAP.md     # 10-day execution milestone tracker
├── package.json                # Root monorepo scripts orchestrator
└── .gitignore                  # Unified repository gitignore
```

## Running the Application
From the repository root:
- `npm run dev`: Starts the Next.js client development server.
- `npm run build`: Builds the production bundle for the client.
- `npm run lint`: Runs ESLint across client files.
- `npm run seed`: Runs the server database seeding utility.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Backend & Database**: Firebase (Authentication, Cloud Firestore)
- **Media Hosting**: Cloudinary (unsigned client-side uploads)
- **Privileged Backend Operations**: Firebase Admin SDK
- **Icons**: Lucide React
- **Deployment Target**: Vercel

## Route & Access Contract

| Route | Access Level | Description & Data Query / Action |
|---|---|---|
| `/` | Public | Homepage showcasing products (`status == "published"`), hero banner, category filters, and search. |
| `/products/[id]` | Public | Dynamic product detail page: fetches product document by ID and loads associated comments (`productId == id`). |
| `/services` | Public | Services showcase + consultation form; writes to `service_inquiries` (admin-only read). |
| `/about` | Public | Static platform overview page. |
| `/contact` | Public | Contact form; writes to `contact_messages` (admin-only read). |
| `/login` | Public (discreet, unlinked from main nav) | Sign-in form using Firebase Auth (Email/Password). The only entry point to the admin dashboard — linked solely from a small "Admin" link in the footer. |
| `/admin/add-project` | Admin Only (`role === "admin"`) | Upload product media to Cloudinary (unsigned upload preset `tapp_uploads`) and create a Firestore document with `status: "published"` (live immediately, no moderation queue). Redirects non-admins to `/login`. Linked only from `/admin`. |
| `/admin` | Admin Only (`role === "admin"`) | Dashboard listing `service_inquiries`, a Contact Messages quick-access card (`/admin/messages`), and a link to `/admin/add-project` to add new listings. Redirects non-admins to `/`. |
| `/admin/messages` | Admin Only (`role === "admin"`) | Full `contact_messages` inbox — resolve/reopen and delete. Redirects non-admins to `/login`. |

> **Removed after Day 6:** `/register` (public self-registration) and the public "+ Add Product" / "Sign In" navbar entry points. There is exactly one user account (the admin), created manually in the Firebase console. See `PLAYBOOK_ROADMAP.md` for when this changed.

## End-to-End Content Journey
```
1. Admin signs in at /login (reached only via the discreet footer link).
2. Admin adds a product at /admin/add-project -> uploads image to Cloudinary,
   creates a Firestore doc with status: "published".
3. Product is immediately live on the homepage catalog (/) and its detail
   page (/products/[id]) — no separate moderation/approval step.
4. Public visitors browse, leave comments, and reach the team via
   /services or /contact (both write admin-only-readable Firestore docs,
   surfaced in /admin and /admin/messages).
```

## Security Boundaries & Rules
- **Firestore Security Rules**:
  - `products`: Public read; admin-only create/update/delete (via `isAdmin()`, checking the caller's `users/{uid}.role`). No moderation queue — admin-authored listings publish immediately.
  - `users`: Authenticated user can read/write their own profile doc. Admins can view/edit roles. (In practice, only the single admin account exists — public registration was removed.)
  - `comments`: Public read; authenticated users can write new comments.
  - `service_inquiries` / `contact_messages`: Public create (basic required-field validation); admin-only read/update/delete.
- **Image Uploads (Cloudinary)**:
  - Product images are uploaded client-side directly to Cloudinary via an unsigned upload preset (`tapp_uploads`, cloud `r75nkzhl`), not Firebase Storage. Limit uploads to image MIME types (`image/jpeg`, `image/png`, `image/webp`) with maximum file size (2 MB), enforced client-side and via the Cloudinary preset's upload restrictions.
