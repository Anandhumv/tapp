"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LogIn, AlertCircle } from "lucide-react";
import { auth } from "../../lib/firebase";

function mapAuthError(code) {
  switch (code) {
    case "auth/invalid-email":
      return "That email address looks invalid.";
    case "auth/user-not-found":
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait and try again.";
    default:
      return "Unable to sign in. Please try again.";
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
          Welcome Back
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Sign in to submit products and track your listings.
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-white/10 bg-[#131316] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#c9a978]/50 focus:outline-none focus:ring-1 focus:ring-[#c9a978]/50"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#c9a978] py-3 text-sm font-semibold text-black hover:bg-[#dfcfbd] transition-colors disabled:opacity-60"
        >
          <LogIn className="h-4 w-4" />
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-[#c9a978] hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
