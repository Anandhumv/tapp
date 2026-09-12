# Wireframes & UX Layout Specification — tapp

This document defines the Desktop and Mobile wireframe layouts for the 4 core views of **tapp**:
1. **Homepage (`/`)**
2. **Detail View (`/products/[id]`)**
3. **Submission Form (`/submit-product`)**
4. **Admin Moderation Dashboard (`/admin`)**

---

## 1. Homepage (`/`)

### Desktop Layout (>= 1024px)
```
+-----------------------------------------------------------------------------------+
|  [Logo] tapp       Search products... [ 🔍 ]       Explore   Submit Product  [Sign In]
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                                   HERO SECTION                                    |
|                   Discover Next-Gen Products & Innovations                        |
|        Explore curated hardware, clean tech, and software built for tomorrow.     |
|                                                                                   |
|                     [ Explore Directory ]      [ Submit a Product ]               |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|  CATEGORIES: [ All (48) ]  [ CleanTech ]  [ Hardware ]  [ SaaS ]  [ AI ]   [Sort: Newest ▾]
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  PRODUCT GRID (3 Columns)                                                         |
|  +------------------------+  +------------------------+  +------------------------+
|  | [ Image Preview ]      |  | [ Image Preview ]      |  | [ Image Preview ]      |
|  | [CleanTech]            |  | [Hardware]             |  | [SaaS]                 |
|  | SolarFlow 800          |  | AeroPulse LiDAR        |  | HyperSync Workspace    |
|  | High-efficiency solar  |  | Autonomous aerial...   |  | Local-first sync...    |
|  | By Arun K. • 12 cmts   |  | By Sarah P. • 4 cmts   |  | By Dave R. • 19 cmts   |
|  +------------------------+  +------------------------+  +------------------------+
|  +------------------------+  +------------------------+  +------------------------+
|  | [ Image Preview ]      |  | [ Image Preview ]      |  | [ Image Preview ]      |
|  | [AI]                   |  | [CleanTech]            |  | [Hardware]             |
|  | NeuroTrace Vision      |  | HydroVolt Battery      |  | QuantumKey Device      |
|  | Real-time edge AI...   |  | Long-duration solid... |  | Hardware encryption... |
|  | By Alex T. • 8 cmts    |  | By Priya S. • 2 cmts   |  | By John D. • 15 cmts   |
|  +------------------------+  +------------------------+  +------------------------+
|                                                                                   |
|                             [ Load More Products ]                                |
+-----------------------------------------------------------------------------------+
|  Footer: tapp © 2026 • Built with Next.js & Firebase • Privacy • Terms • GitHub  |
+-----------------------------------------------------------------------------------+
```

### Mobile Layout (< 768px)
```
+------------------------------------+
| [Logo] tapp             [ 🔍 ] [ ☰ ]
+------------------------------------+
|                                    |
|            HERO BANNER             |
|      Discover Next-Gen Tech        |
|  Curated directory for makers.     |
|                                    |
|  [ Submit Product ] [ Explore ]    |
+------------------------------------+
| CATEGORIES (Horizontal Scroll):    |
| [All] [CleanTech] [Hardware] [SaaS]|
+------------------------------------+
| SINGLE-COLUMN CARDS                |
| +--------------------------------+ |
| | [ Image Preview ]              | |
| | [CleanTech]                    | |
| | SolarFlow 800                  | |
| | High-efficiency solar balcony  | |
| | 12 Comments • By Arun K.       | |
| +--------------------------------+ |
| +--------------------------------+ |
| | [ Image Preview ]              | |
| | [Hardware]                     | |
| | AeroPulse LiDAR                | |
| | Autonomous aerial sensing...   | |
| | 4 Comments • By Sarah P.       | |
| +--------------------------------+ |
|        [ Load More ]               |
+------------------------------------+
| Footer • Links • Socials           |
+------------------------------------+
```

---

## 2. Product Detail Page (`/products/[id]`)

### Desktop Layout (>= 1024px)
```
+-----------------------------------------------------------------------------------+
|  [Logo] tapp       Search products... [ 🔍 ]       Explore   Submit Product  [Avatar]
+-----------------------------------------------------------------------------------+
|  < Back to Directory  /  CleanTech  /  SolarFlow 800                              |
|                                                                                   |
|  +---------------------------------------+  +-------------------------------------+
|  |                                       |  | [CleanTech]   Status: [Verified]    |
|  |                                       |  | SolarFlow Microinverter 800         |
|  |                                       |  | High-efficiency plug-and-play solar |
|  |                                       |  |-------------------------------------|
|  |             PRODUCT IMAGE             |  | Submitted by:                       |
|  |          (High-Res Showcase)          |  | [Avatar] Arun Kumar (arun@solar.co) |
|  |                                       |  | Date: Sept 12, 2026                 |
|  |                                       |  |                                     |
|  |                                       |  | [ Share Listing ]  [ Visit Website ↗]|
|  +---------------------------------------+  +-------------------------------------+
|                                                                                   |
|  FULL SPECIFICATIONS & DESCRIPTION                                                |
|  +------------------------------------------------------------------------------+ |
|  | Equipped with dual MPPT trackers, Wi-Fi telemetry, and over 96.5% peak CEC   | |
|  | efficiency for residential rooftop and balcony micro-generation setups.       | |
|  +------------------------------------------------------------------------------+ |
|                                                                                   |
|  COMMUNITY DISCUSSION & FEEDBACK (12)                                             |
|  +------------------------------------------------------------------------------+ |
|  | Leave a comment or question:                                                 | |
|  | [ Write your thoughts or questions here...                                 ] | |
|  |                                                        [ Post Comment ]      | |
|  +------------------------------------------------------------------------------+ |
|  | [Avatar] Rahul M. • 2 hours ago                                              | |
|  | Does this package include standard MC4 connector adaptors for third-party?  | |
|  |------------------------------------------------------------------------------| |
|  | [Avatar] Sarah P. • 1 day ago                                                | |
|  | Impressive CEC efficiency rating! Is the Wi-Fi local or cloud dependent?    | |
|  +------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
```

### Mobile Layout (< 768px)
```
+------------------------------------+
| [< Back]  tapp              [Share]|
+------------------------------------+
| [ PRODUCT IMAGE ]                  |
+------------------------------------+
| [CleanTech]                        |
| SolarFlow Microinverter 800        |
| High-efficiency solar balcony...   |
| By Arun Kumar • Sept 12            |
+------------------------------------+
| [ Visit Website ↗ ]                |
+------------------------------------+
| DESCRIPTION                        |
| Equipped with dual MPPT trackers...|
| Peak 96.5% CEC efficiency...       |
+------------------------------------+
| COMMENTS (12)                      |
| [ Add a comment...               ] |
| [ Submit ]                         |
|------------------------------------|
| Rahul M.: Does this package include|
| MC4 adaptors?                      |
+------------------------------------+
```

---

## 3. Product Submission Form (`/submit-product`)

### Desktop Layout (>= 1024px)
```
+-----------------------------------------------------------------------------------+
|  [Logo] tapp       Explore   Submit Product                        [User Profile] |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|   Submit a New Product for Curation                                               |
|   Every submission is reviewed by our team before going live on the catalog.      |
|                                                                                   |
|   FORM INPUTS (Left 60%)                  LIVE PREVIEW CARD (Right 40%)           |
|   +------------------------------------+  +------------------------------------+  |
|   | Product Name *                     |  | Live Preview                       |  |
|   | [ e.g. SolarFlow 800             ] |  | +--------------------------------+ |  |
|   |                                    |  | | [ Uploaded Image ]             | |  |
|   | Category *                         |  | | [Category Badge]               | |  |
|   | [ Select (CleanTech, SaaS, etc.) ▾]|  | | Product Title Appears Here     | |  |
|   |                                    |  | | Short tagline snippet...       | |  |
|   | Tagline * (Max 80 chars)           |  | | Submitted by You               | |  |
|   | [ One-line catchy summary        ] |  | +--------------------------------+ |  |
|   |                                    |  | Status: [ Pending Review 🟡 ]      |  |
|   | Product Image * (Max 2MB)          |  +------------------------------------+  |
|   | +--------------------------------+ |                                          |
|   | | 📁 Drag & drop PNG, JPG, WEBP  | |                                          |
|   | | or [ Browse Files ]            | |                                          |
|   | +--------------------------------+ |                                          |
|   |                                    |                                          |
|   | Detailed Description *             |                                          |
|   | [ Describe technical specs,       |                                          |
|   |   benefits, and features...      ] |                                          |
|   |                                    |                                          |
|   | [ Cancel ]     [ Submit for Review ]                                          |
|   +------------------------------------+                                          |
+-----------------------------------------------------------------------------------+
```

### Mobile Layout (< 768px)
```
+------------------------------------+
| [< Back]  Submit Product           |
+------------------------------------+
| Submit for Curation                |
| Reviewed before surfacing.         |
|                                    |
| Product Name *                     |
| [                              ]   |
|                                    |
| Category *                         |
| [ Select category             ▾]   |
|                                    |
| Tagline *                          |
| [ Short tagline                ]   |
|                                    |
| Image Upload (Max 2MB)             |
| [ + Tap to Choose Photo        ]   |
|                                    |
| Detailed Description *             |
| [ Full product details...      ]   |
|                                    |
| [ Preview Card Toggle ▾ ]          |
|                                    |
| [ Submit for Review ]              |
+------------------------------------+
```

---

## 4. Admin Moderation Dashboard (`/admin`)

### Desktop Layout (>= 1024px)
```
+-----------------------------------------------------------------------------------+
|  [Logo] tapp  |  ADMIN PANEL                       Catalog   View Site   [Admin ▾]|
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  OVERVIEW METRICS                                                                 |
|  +--------------------+  +--------------------+  +--------------------+           |
|  |  Pending Review    |  |  Approved Active   |  |  Total Products    |           |
|  |        3           |  |       45           |  |       48           |           |
|  +--------------------+  +--------------------+  +--------------------+           |
|                                                                                   |
|  TABS: [ Pending Submissions (3) ]   [ Approved Catalog (45) ]   [ All Users ]    |
|                                                                                   |
|  PENDING SUBMISSION QUEUE                                                         |
|  +------------------------------------------------------------------------------+ |
|  | [Thumb] NeuroTrace Diagnostic AI                     Submitted: 10m ago      | |
|  |         Category: AI • Submitter: dev@example.com    Status: [Pending 🟡]     | |
|  |         "Real-time edge neural inference for medical..."                     | |
|  |                                    [ 👁 Details ] [ ✔ Approve ] [ ✖ Reject ] | |
|  +------------------------------------------------------------------------------+ |
|  | [Thumb] EcoCharge Smart Grid Node                    Submitted: 2h ago       | |
|  |         Category: CleanTech • Submitter: eco@green.io Status: [Pending 🟡]    | |
|  |         "Bidirectional EV charging and home power..."                        | |
|  |                                    [ 👁 Details ] [ ✔ Approve ] [ ✖ Reject ] | |
|  +------------------------------------------------------------------------------+ |
|  | [Thumb] Waveform Audio Coprocessor                   Submitted: 5h ago       | |
|  |         Category: Hardware • Submitter: audio@dsp.net Status: [Pending 🟡]    | |
|  |         "Ultra-low latency hardware audio DSP unit..."                       | |
|  |                                    [ 👁 Details ] [ ✔ Approve ] [ ✖ Reject ] | |
|  +------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
```

### Mobile Layout (< 768px)
```
+------------------------------------+
| [ ☰ ] tapp Admin            [Admin]|
+------------------------------------+
| Pending: 3  |  Approved: 45        |
+------------------------------------+
| PENDING SUBMISSIONS (3)            |
| +--------------------------------+ |
| | [Thumb] NeuroTrace AI          | |
| | Cat: AI • 10m ago              | |
| | Submitter: dev@example.com     | |
| | [ 👁 View ]                     | |
| | [ ✔ Approve ]    [ ✖ Reject ]  | |
| +--------------------------------+ |
| +--------------------------------+ |
| | [Thumb] EcoCharge Node         | |
| | Cat: CleanTech • 2h ago        | |
| | Submitter: eco@green.io        | |
| | [ 👁 View ]                     | |
| | [ ✔ Approve ]    [ ✖ Reject ]  | |
| +--------------------------------+ |
+------------------------------------+
```
