"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { UserPlus, AlertCircle } from "lucide-react";
import { auth, db } from "../../lib/firebase";

function mapAuthError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "That email address looks invalid.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    default:
      return "Unable to create account. Please try again.";
  }
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });
      await setDoc(doc(db, "users", credential.user.uid), {
        name,
        email,
        role: "user",
        createdAt: serverTimestamp(),
      });
      router.push("/");
    } catch (err) {
      setError(mapAuthError(err.code));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md py-24 px-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Create an Account
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Join the directory to submit and track your product listings.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Arun Kumar"
            className="w-full rounded-lg border border-white/10 bg-[#131316] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#c9a978]/50 focus:outline-none focus:ring-1 focus:ring-[#c9a978]/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-white/10 bg-[#131316] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#c9a978]/50 focus:outline-none focus:ring-1 focus:ring-[#c9a978]/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
            Password
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full rounded-lg border border-white/10 bg-[#131316] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#c9a978]/50 focus:outline-none focus:ring-1 focus:ring-[#c9a978]/50"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#c9a978] py-3 text-sm font-semibold text-black hover:bg-[#dfcfbd] transition-colors disabled:opacity-60"
        >
          <UserPlus className="h-4 w-4" />
          {submitting ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="text-[#c9a978] hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
