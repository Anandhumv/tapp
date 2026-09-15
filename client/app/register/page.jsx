"use client";
import { validateEmail } from "../../lib/validateEmail";
import { register } from "../../lib/auth";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Check for valid format and block domain typos like gmali.com
    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setError(emailCheck.error);
      return; // Halts registration before hitting Firebase
    }

    setLoading(true);

    try {
      // 2. Pass the trimmed, normalized email to Firebase
      await register(emailCheck.cleanEmail, password, name);
      router.push("/");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

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

      <form onSubmit={handleRegister} className="space-y-5">
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
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#c9a978] py-3 text-sm font-semibold text-black hover:bg-[#dfcfbd] transition-colors disabled:opacity-60"
        >
          <UserPlus className="h-4 w-4" />
          {loading ? "Creating account..." : "Register"}
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
