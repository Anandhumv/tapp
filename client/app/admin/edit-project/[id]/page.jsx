"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { uploadToCloudinary } from "../../../../lib/cloudinary";
import {
    UploadCloud,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ShieldCheck,
    ArrowLeft,
} from "lucide-react";
import { db } from "../../../../lib/firebase";
import { useAuth } from "../../../../lib/AuthContext";

const CATEGORIES = [
    "Clean-Tech & Energy",
    "Autonomous Robotics",
    "AI & Neural Hardware",
    "Spatial Computing",
    "Luxury Consumer Tech",
    "Developer Tools",
];

const PRICING_MODELS = [
    "Free",
    "Freemium",
    "Subscription",
    "Hardware Purchase",
    "Enterprise",
];

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

export default function EditProjectPage({ params }) {
    const { id } = use(params);
    const { user, role, loading: authLoading } = useAuth();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [tagline, setTagline] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [pricing, setPricing] = useState(PRICING_MODELS[0]);
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [demoUrl, setDemoUrl] = useState("");
    const [existingImageUrl, setExistingImageUrl] = useState("");

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [loadingProject, setLoadingProject] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!authLoading && (!user || role !== "admin")) {
            router.push("/login");
        }
    }, [user, role, authLoading, router]);

    useEffect(() => {
        if (role !== "admin") return;

        async function loadProject() {
            try {
                const snap = await getDoc(doc(db, "products", id));
                if (!snap.exists()) {
                    setNotFound(true);
                    return;
                }
                const data = snap.data();
                setTitle(data.title || "");
                setTagline(data.tagline || "");
                setDescription(data.description || "");
                setCategory(data.category || CATEGORIES[0]);
                setPricing(data.pricing || PRICING_MODELS[0]);
                setWebsiteUrl(data.websiteUrl || "");
                setDemoUrl(data.demoUrl || "");
                setExistingImageUrl(data.imageUrl || "");
            } catch (err) {
                console.error("Error loading project:", err);
                setErrorMessage("Unable to load this project. Please try again.");
            } finally {
                setLoadingProject(false);
            }
        }

        loadProject();
    }, [id, role]);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            setErrorMessage("Only JPG, PNG, and WebP formats are supported.");
            setImageFile(null);
            setImagePreview(null);
            e.target.value = "";
            return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            setErrorMessage("Image size must be 2MB or less.");
            setImageFile(null);
            setImagePreview(null);
            e.target.value = "";
            return;
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSubmitting(true);

        try {
            // 1. Upload replacement image only if a new file was selected
            let imageUrl = existingImageUrl;
            if (imageFile) {
                setUploadingImage(true);
                imageUrl = await uploadToCloudinary(imageFile);
                setUploadingImage(false);
            }

            // 2. Update the Firestore document
            await updateDoc(doc(db, "products", id), {
                title: title.trim(),
                tagline: tagline.trim(),
                description: description.trim(),
                category,
                pricing,
                websiteUrl: websiteUrl.trim(),
                demoUrl: demoUrl.trim() || null,
                imageUrl,
                updatedAt: serverTimestamp(),
            });

            router.push("/admin");
        } catch (err) {
            console.error("Update error:", err);
            setErrorMessage(err.message || "Failed to update project.");
        } finally {
            setSubmitting(false);
            setUploadingImage(false);
        }
    };

    if (authLoading || !user || role !== "admin" || loadingProject) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center text-xs text-body">
                <Loader2 className="h-5 w-5 animate-spin text-accent mr-2" />
                {authLoading || !user || role !== "admin" ? "Verifying access..." : "Loading project..."}
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 pt-24 text-center px-4">
                <AlertCircle className="w-8 h-8 text-body/60" />
                <p className="text-sm text-body">This project could not be found.</p>
                <Link href="/admin" className="text-xs font-semibold text-accent hover:underline">
                    Back to Admin Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl pt-28 pb-20 px-4">
            <div className="mb-8">
                <Link
                    href="/admin"
                    className="inline-flex items-center gap-1 text-xs text-body hover:text-accent transition-colors mb-4"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Admin Dashboard</span>
                </Link>
                <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                        Admin Tools
                    </span>
                </div>
                <h1 className="font-display text-3xl font-bold text-heading tracking-tight">
                    Edit Project
                </h1>
                <p className="mt-1 text-sm text-body">
                    Update this listing&apos;s details or replace its showcase image.
                </p>
            </div>

            {errorMessage && (
                <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-xs text-red-500">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                            Product Title <span className="text-accent">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-xl bg-surface border border-line px-4 py-2.5 text-sm text-heading placeholder-body/60 focus:border-line-hover focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                            Tagline <span className="text-accent">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={tagline}
                            onChange={(e) => setTagline(e.target.value)}
                            className="w-full rounded-xl bg-surface border border-line px-4 py-2.5 text-sm text-heading placeholder-body/60 focus:border-line-hover focus:outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                            Category <span className="text-accent">*</span>
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-xl bg-surface border border-line px-4 py-2.5 text-sm text-heading focus:border-line-hover focus:outline-none"
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                            Pricing Model <span className="text-accent">*</span>
                        </label>
                        <select
                            value={pricing}
                            onChange={(e) => setPricing(e.target.value)}
                            className="w-full rounded-xl bg-surface border border-line px-4 py-2.5 text-sm text-heading focus:border-line-hover focus:outline-none"
                        >
                            {PRICING_MODELS.map((p) => (
                                <option key={p} value={p}>
                                    {p}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                            Official Website URL <span className="text-accent">*</span>
                        </label>
                        <input
                            type="url"
                            required
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            className="w-full rounded-xl bg-surface border border-line px-4 py-2.5 text-sm text-heading placeholder-body/60 focus:border-line-hover focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                            Video / Demo URL <span className="text-body">(Optional)</span>
                        </label>
                        <input
                            type="url"
                            value={demoUrl}
                            onChange={(e) => setDemoUrl(e.target.value)}
                            className="w-full rounded-xl bg-surface border border-line px-4 py-2.5 text-sm text-heading placeholder-body/60 focus:border-line-hover focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                        Detailed Overview & Specifications <span className="text-accent">*</span>
                    </label>
                    <textarea
                        required
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-xl bg-surface border border-line px-4 py-2.5 text-sm text-heading placeholder-body/60 focus:border-line-hover focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                        Showcase Media (Hero Image)
                    </label>
                    <div className="relative border-2 border-dashed border-line rounded-2xl p-6 bg-surface/50 hover:border-line-hover transition-colors">
                        {imagePreview || existingImageUrl ? (
                            <div className="space-y-4">
                                <div className="relative w-full h-64 rounded-xl overflow-hidden border border-line">
                                    <img
                                        src={imagePreview || existingImageUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-body truncate max-w-xs">
                                        {imageFile ? imageFile.name : "Current image"}
                                    </span>
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer text-xs font-semibold text-accent hover:underline"
                                    >
                                        Replace Image
                                    </label>
                                </div>
                            </div>
                        ) : (
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer flex flex-col items-center justify-center py-6"
                            >
                                <div className="p-3 rounded-full bg-accent/10 border border-line text-accent mb-3">
                                    <UploadCloud className="h-6 w-6" />
                                </div>
                                <p className="text-sm font-medium text-heading mb-1">
                                    Click to upload showcase image
                                </p>
                                <p className="text-xs text-body">JPG, PNG, or WebP up to 2MB</p>
                            </label>
                        )}
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                    <p className="text-[11px] text-body mt-1.5">
                        Leave unchanged to keep the current image.
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-strong py-3.5 text-sm font-semibold text-black hover:brightness-110 transition-all disabled:opacity-50 shadow-lg shadow-accent/20"
                >
                    {submitting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>
                                {uploadingImage ? "Uploading Media to Cloudinary..." : "Saving Changes..."}
                            </span>
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Save Changes</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
