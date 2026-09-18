"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../lib/AuthContext";
import { db } from "../../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { uploadToCloudinary } from "../../../lib/cloudinary";
import {
    UploadCloud,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ShieldCheck,
    ArrowLeft,
} from "lucide-react";
import Link from "next/link";

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

export default function AddProjectPage() {
    const { user, role, loading: authLoading } = useAuth();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [tagline, setTagline] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [pricing, setPricing] = useState(PRICING_MODELS[0]);
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [demoUrl, setDemoUrl] = useState("");

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!authLoading && (!user || role !== "admin")) {
            router.push("/login");
        }
    }, [user, role, authLoading, router]);

    const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
    const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

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

        if (!imageFile) {
            setErrorMessage("Please select a showcase image for your listing.");
            return;
        }

        setSubmitting(true);

        try {
            // 1. Upload to Cloudinary
            setUploadingImage(true);
            const imageUrl = await uploadToCloudinary(imageFile);
            setUploadingImage(false);

            // 2. Add document to Firestore
            await addDoc(collection(db, "products"), {
                title: title.trim(),
                tagline: tagline.trim(),
                description: description.trim(),
                category,
                pricing,
                websiteUrl: websiteUrl.trim(),
                demoUrl: demoUrl.trim() || null,
                imageUrl,
                userId: user.uid,
                userEmail: user.email,
                status: "published",
                upvotesCount: 0,
                createdAt: serverTimestamp(),
            });

            setSuccess(true);
            setTimeout(() => {
                router.push("/admin");
            }, 2000);
        } catch (err) {
            console.error("Submission error:", err);
            setErrorMessage(err.message || "Failed to publish project.");
        } finally {
            setSubmitting(false);
            setUploadingImage(false);
        }
    };

    if (authLoading || !user || role !== "admin") {
        return (
            <div className="min-h-[70vh] flex items-center justify-center text-xs text-body">
                <Loader2 className="h-5 w-5 animate-spin text-accent mr-2" />
                Verifying access...
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4 pt-20">
                <div className="w-full max-w-lg rounded-2xl bg-surface border border-line-hover p-8 text-center shadow-2xl">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-accent mb-4 animate-bounce" />
                    <h2 className="font-display text-2xl font-bold text-heading mb-2">Project Published</h2>
                    <p className="text-sm text-body mb-6">
                        The listing is now live on the public directory.
                    </p>
                    <div className="text-xs text-body">Redirecting to Admin Dashboard...</div>
                </div>
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
                    Add New Project
                </h1>
                <p className="mt-1 text-sm text-body">
                    Internal tool for publishing a new listing directly to the TAPP directory.
                </p>
            </div>

            <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-xs text-amber-600 dark:text-amber-300">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                    <strong>Note:</strong> Listings created here are saved with <code>published</code> status and appear on the public directory immediately.
                </span>
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
                        Showcase Media (Hero Image) <span className="text-accent">*</span>
                    </label>
                    <div className="relative border-2 border-dashed border-line rounded-2xl p-6 bg-surface/50 hover:border-line-hover transition-colors">
                        {imagePreview ? (
                            <div className="space-y-4">
                                <div className="relative w-full h-64 rounded-xl overflow-hidden border border-line">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-body truncate max-w-xs">
                                        {imageFile?.name}
                                    </span>
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer text-xs font-semibold text-accent hover:underline"
                                    >
                                        Change Image
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
                                {uploadingImage
                                    ? "Uploading Media to Cloudinary..."
                                    : "Publishing Project..."}
                            </span>
                        </>
                    ) : (
                        <span>Publish Project</span>
                    )}
                </button>
            </form>
        </div>
    );
}
