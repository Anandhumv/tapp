# 10-Day Execution Roadmap & Progress Tracker

Track the daily progress of the **tapp** product directory web application.

- [x] **Day 1: Setup & Discovery**
  - [x] Lock MVP scope & define technical contracts (Firestore schema, route table).
  - [x] Create client intake discovery questionnaire (`docs/CLIENT_INTAKE.md`).
  - [x] Initialize Next.js project with Tailwind CSS, `firebase`, and `lucide-react`.
  - [x] Configure `.gitignore` and `.env.local.example`.
  - [x] Define mobile and desktop wireframes for core views (`docs/WIREFRAMES.md`).
  - [x] Reorganize into clean `client/` and `server/` domains.
  - [x] Commit Day 1 baseline to Git and push to GitHub repository `tapp`.

- [x] **Day 2: Shell & Layout Foundation**
  - [x] Define dark theme, typography, and scrollbars in `client/app/globals.css`.
  - [x] Build responsive `components/Navbar.jsx` with logo, navigation links, and dynamic auth placeholders.
  - [x] Build `components/Footer.jsx` with credentials, copyright, and quick links.
  - [x] Wrap application routes in `client/app/layout.js`.
  - [x] Build Homepage Hero banner in `client/app/page.jsx` with headline, tagline, and CTA.

- [x] **Day 3: Static UI & Card Architecture**
  - [x] Create reusable `components/ProductCard.jsx` with image, name, category badge, and brief description.
  - [x] Populate `client/app/page.jsx` with responsive 3-column grid of dummy product data.
  - [x] Build static layout for dynamic route `client/app/products/[id]/page.jsx` (large image, specs, mock comments).
  - [x] Build static UI for `client/app/submit-product/page.jsx` (form fields and file input).

- [x] **Day 4: Firebase Infrastructure Setup**
  - [x] Configure Firebase project `tapp-5b99f` (Auth, Cloud Firestore). Cloud Storage was intentionally swapped for Cloudinary to avoid billing — see `docs/ARCHITECTURE.md`.
  - [x] Set up credentials in `client/.env.local`.
  - [x] Configure Firestore security rules (`firestore.rules`, published via console).

- [x] **Day 5: Authentication & Role Gating**
  - [x] Implement `client/app/login/page.jsx` and `client/app/register/page.jsx` (Email/Password only; Google Auth not implemented — out of MVP scope per playbook stretch goals). Both enforce a strict `@gmail.com`-only policy via `lib/validateEmail.js`.
  - [x] Auto-create user doc on registration with `role: "user"`.
  - [x] Admin role assignment in Firestore (done manually in console).
  - [x] Wire Navbar user state, sign-out, and conditional Admin link.
  - [x] Protect `/submit-product` route.

- [ ] **Day 6: Image Uploads & Submission Pipeline**
  - [ ] Client-side validation on `/submit-product` (<= 2 MB, `.jpg`, `.png`, `.webp`).
  - [ ] Upload image file to Cloud Storage (`/products/{timestamp}_{filename}`).
  - [ ] Insert Firestore product doc with `status: "pending"`.
  - [ ] Success state and confirmation feedback.

- [ ] **Day 7: Dynamic Catalog & Comments**
  - [ ] Live Firestore query for homepage (`status == "approved"`).
  - [ ] Wire dynamic detail page `client/app/products/[id]/page.jsx` using `getDoc()`.
  - [ ] Wire comment submission & query comments collection in real-time.

- [ ] **Day 8: Admin Review Dashboard**
  - [ ] Build `client/app/admin/page.jsx` restricted strictly to `role === "admin"`.
  - [ ] Display pending products in clean moderation cards.
  - [ ] One-click Approve action (`status: "approved"`).
  - [ ] One-click Reject/Delete action (deletes doc and Storage image).

- [ ] **Day 9: Bug Bash, Polish & Staging Deploy**
  - [ ] Full bug bash & edge case handling.
  - [ ] Loading spinners and skeleton loaders.
  - [ ] Mobile responsiveness verification.
  - [ ] Vercel deployment with environment variables.
  - [ ] Seed starter catalog products.

- [ ] **Day 10: Production Launch & Handover**
  - [ ] End-to-end smoke test on production URL.
  - [ ] Custom domain DNS mapping.
  - [ ] Handover walkthrough and documentation finalization.
