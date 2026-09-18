# Cloud Firestore Data Model & Schema Contracts — tapp

> [!IMPORTANT]
> Field names must match exactly as specified below across all client components, forms, and database queries.

---

### 1. `users/{uid}`
Stores user profile information and authorization role.

```json
{
  "name": "Arun Kumar",
  "email": "arun@example.com",
  "role": "user", // "user" | "admin"
  "createdAt": "2026-09-12T10:00:00.000Z" // Firestore Timestamp or ISO string
}
```
*Note: The platform founder/client is manually granted the `admin` role directly in the Firebase Console or via seed script. Public self-registration was removed after Day 6 — this is the only account on the platform.*

---

### 2. `products/{id}`
Stores product listings added via `/submit-product` (admin-only since Day 6+).

```json
{
  "name": "Industrial Solar Inverter X1",
  "category": "CleanTech",
  "tagline": "High-efficiency bifacial panel setup",
  "description": "Full specifications and technical overview...",
  "imageUrl": "https://res.cloudinary.com/r75nkzhl/...",
  "status": "pending", // "pending" | "approved" (Controls homepage visibility)
  "userId": "submitter_uid",
  "userEmail": "submitter@example.com",
  "createdAt": "2026-09-12T10:00:00.000Z" // Firestore Timestamp
}
```

---

### 3. `comments/{id}`
Stores feedback and questions for a specific product.

```json
{
  "productId": "product_document_id",
  "userId": "commenter_uid",
  "userName": "Rahul M.",
  "commentText": "Does this package include warranty support?",
  "createdAt": "2026-09-12T10:00:00.000Z" // Firestore Timestamp
}
```

---

### 4. `service_inquiries/{id}`
Consultation requests submitted from `/services`. Public create, admin-only read.

```json
{
  "fullName": "Dr. Evelyn Stone",
  "organization": "OmniDynamics Labs",
  "email": "evelyn@gmail.com",
  "serviceOfInterest": "Bespoke Hardware Sourcing",
  "projectScope": "Full requirements text...",
  "userId": "commenter_uid_or_null",
  "status": "new",
  "createdAt": "2026-09-12T10:00:00.000Z" // Firestore Timestamp
}
```

---

### 5. `contact_messages/{id}`
Messages submitted from `/contact`. Public create, admin-only read.

```json
{
  "name": "Arun Kumar",
  "email": "arun@gmail.com",
  "message": "Full message text...",
  "status": "new",
  "createdAt": "2026-09-12T10:00:00.000Z" // Firestore Timestamp
}
```
