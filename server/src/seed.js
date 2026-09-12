import { adminDb } from "./firebaseAdmin.js";

const sampleProducts = [
  {
    name: "SolarFlow Microinverter 800",
    category: "CleanTech",
    tagline: "High-efficiency plug-and-play balcony solar setup",
    description: "Equipped with dual MPPT trackers, Wi-Fi telemetry, and over 96.5% peak CEC efficiency for residential rooftop and balcony setups.",
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80",
    status: "approved",
    userId: "seed_admin_1",
    userEmail: "admin@tapp.local",
    createdAt: new Date().toISOString()
  },
  {
    name: "AeroPulse Drone Sensor",
    category: "Hardware",
    tagline: "Ultra-light LiDAR payload for autonomous mapping",
    description: "Compact LiDAR scanner weighing just 350 grams with 100m range and millimetre-grade accuracy for precision agriculture and survey missions.",
    imageUrl: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80",
    status: "approved",
    userId: "seed_admin_1",
    userEmail: "admin@tapp.local",
    createdAt: new Date().toISOString()
  },
  {
    name: "HyperSync Workspace",
    category: "SaaS",
    tagline: "Local-first collaboration engine with instant offline sync",
    description: "A fast, privacy-first knowledge base built on CRDTs with instant peer-to-peer sync and enterprise-grade end-to-end encryption.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    status: "approved",
    userId: "seed_admin_1",
    userEmail: "admin@tapp.local",
    createdAt: new Date().toISOString()
  },
  {
    name: "NeuroTrace Diagnostic AI",
    category: "AI",
    tagline: "Real-time edge neural inference for medical telemetry",
    description: "FDA-ready computer vision model pipeline running locally on embedded hospital devices for early anomaly detection.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    status: "pending",
    userId: "seed_contributor_1",
    userEmail: "developer@example.com",
    createdAt: new Date().toISOString()
  }
];

async function seed() {
  console.log("Starting database seed...");
  try {
    for (const product of sampleProducts) {
      const docRef = await adminDb.collection("products").add(product);
      console.log(`Added product "${product.name}" with ID: ${docRef.id}`);
    }
    console.log("Seeding finished successfully!");
  } catch (err) {
    console.error("Error seeding products:", err.message);
    process.exit(1);
  }
}

seed();
