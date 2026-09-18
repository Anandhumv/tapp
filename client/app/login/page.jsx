"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LogIn, AlertCircle, ShieldCheck } from "lucide-react";
import { auth } from "../../lib/firebase";
import { validateEmail } from "../../lib/validateEmail";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setError(emailCheck.error);
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, emailCheck.cleanEmail, password);
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
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-accent/10 border border-line text-accent mb-4">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl">
          Admin Access
        </h1>
        <p className="mt-1 text-sm text-body">
          Restricted sign-in for site administration.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/25 bg-red-500/10 p-4 text-xs text-red-500">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-heading placeholder-body/60 focus:border-line-hover focus:outline-none focus:ring-1 focus:ring-accent/40"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-heading placeholder-body/60 focus:border-line-hover focus:outline-none focus:ring-1 focus:ring-accent/40"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent-strong py-3 text-sm font-semibold text-black hover:brightness-110 transition-all disabled:opacity-60"
        >
          <LogIn className="h-4 w-4" />
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
