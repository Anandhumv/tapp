"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  User,
  Mail,
  Phone,
  Shield,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Sparkles,
  Save,
} from "lucide-react";
import { auth, db } from "../../lib/firebase";
import { useAuth } from "../../lib/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, role, loading: authLoading } = useAuth();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userRole, setUserRole] = useState("user");
  const [createdAt, setCreatedAt] = useState(null);

  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Route protection
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  // Fetch user data from Firestore
  useEffect(() => {
    async function loadUserData() {
      if (!user) return;
      try {
        setLoadingData(true);
        const userDocRef = doc(db, "users", user.uid);
        const snap = await getDoc(userDocRef);

        if (snap.exists()) {
          const data = snap.data();
          setFullName(data.name || data.fullName || user.displayName || "");
          setPhoneNumber(data.phoneNumber || "");
          setUserRole(data.role || role || "user");
          if (data.createdAt?.toDate) {
            setCreatedAt(data.createdAt.toDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }));
          }
        } else {
          setFullName(user.displayName || "");
          setUserRole(role || "user");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setErrorMessage("Unable to retrieve profile details. Please try again.");
      } finally {
        setLoadingData(false);
      }
    }

    if (user) {
      loadUserData();
    }
  }, [user, role]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // 1. Update Firebase Auth displayName if changed
      if (fullName.trim() && fullName.trim() !== user.displayName) {
        await updateProfile(user, { displayName: fullName.trim() });
      }

      // 2. Persist to Firestore users/{uid}
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          name: fullName.trim(),
          fullName: fullName.trim(),
          phoneNumber: phoneNumber.trim(),
          email: user.email,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setSuccessMessage("Profile credentials updated successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrorMessage(err.message || "Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || (loadingData && !user)) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 pt-24">
        <Loader2 className="w-7 h-7 animate-spin text-[#c9a978]" />
        <p className="text-xs uppercase tracking-widest text-zinc-400">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initials = (fullName || user.email || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-[#c9a978] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Directory</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#18181c] to-[#121215] border border-white/10 p-6 sm:p-8 shadow-2xl mb-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#c9a978]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar Pill */}
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#c9a978] to-[#8d6f3e] text-black font-bold text-xl sm:text-2xl shadow-xl ring-4 ring-[#18181c]">
              {initials}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-[#121215]" />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {fullName || "Verified Member"}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#c9a978]/15 border border-[#c9a978]/30 text-[#c9a978]">
                  <Shield className="w-3 h-3" />
                  {userRole}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 flex items-center gap-2">
                <span>{user.email}</span>
                {createdAt && (
                  <>
                    <span className="text-zinc-600">�</span>
                    <span className="text-zinc-500 text-xs">Member since {createdAt}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-zinc-400">
              UID: {user.uid.slice(0, 8)}...
            </span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs shadow-lg animate-in fade-in duration-300">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs shadow-lg animate-in fade-in duration-300">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Profile Form Card */}
      <div className="rounded-3xl bg-[#131316] border border-white/10 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-white">Account Information</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Manage your identity and communication details on TAPP.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#c9a978]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TAPP Verified</span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Read-only Authenticated Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Authenticated Email (Read-Only)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={user.email || ""}
                disabled
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1a1a1e]/60 border border-white/5 text-sm text-zinc-400 cursor-not-allowed select-none font-mono"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-[10px] text-zinc-500 font-medium">
                Verified
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1.5">
              Email addresses are tied to authentication and cannot be changed here.
            </p>
          </div>

          {/* Editable Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <User className="w-4 h-4" />
              </div>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g., Katherine Vance"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#18181c] border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#c9a978] focus:ring-1 focus:ring-[#c9a978]/40 transition-all"
              />
            </div>
          </div>

          {/* Editable Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2"
            >
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g., +1 (555) 019-2834"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#18181c] border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#c9a978] focus:ring-1 focus:ring-[#c9a978]/40 transition-all"
              />
            </div>
          </div>

          {/* Role / Access Level Details */}
          <div className="rounded-2xl bg-[#18181c]/50 border border-white/5 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#c9a978]/10 text-[#c9a978]">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Access Level</p>
                <p className="text-[11px] text-zinc-400">
                  {userRole === "admin"
                    ? "Full administrative moderation & curation privileges"
                    : "Standard ecosystem participant & product submitter"}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-zinc-300">
              {userRole}
            </span>
          </div>

          {/* Save Action */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#c9a978] to-[#b3915f] hover:from-[#dfcfbd] hover:to-[#c9a978] text-black font-semibold text-xs uppercase tracking-wider shadow-lg shadow-[#c9a978]/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-black" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
