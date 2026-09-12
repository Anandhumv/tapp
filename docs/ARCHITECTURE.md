# System Architecture & Contracts ?" tapp

## Overview
**tapp** is a product discovery and community showcase platform designed for public browsing, user submissions, and administrative curation.

## Repository Structure (Client & Server)
The repository is structured with explicit separation of frontend (client) and backend (server) domains:

```
tapp/
├── client/                     # Next.js frontend application (App Router)
│   ├── app/                    # Routes and pages (/, /products/[id], /submit-product, etc.)
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
- **Backend & Database**: Firebase (Authentication, Cloud Firestore, Cloud Storage)
- **Privileged Backend Operations**: Firebase Admin SDK
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
