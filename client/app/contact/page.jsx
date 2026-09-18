"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  Mail,
  User,
  MessageSquareText,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Code2,
  Globe,
} from "lucide-react";
import { db } from "../../lib/firebase";
import { validateEmail } from "../../lib/validateEmail";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setErrorMessage(emailCheck.error);
      return;
    }

    if (!message.trim()) {
      setErrorMessage("Please enter a message.");
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, "contact_messages"), {
        name: name.trim(),
        email: emailCheck.cleanEmail,
        message: message.trim(),
        status: "new",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting contact message:", err);
      setErrorMessage(err.message || "Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <section className="text-center relative pt-8 pb-14 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[280px] bg-accent/15 blur-[130px] rounded-full pointer-events-none" />

        <span className="inline-block text-[11px] uppercase tracking-widest text-accent font-bold mb-3">
          Get in Touch
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-heading leading-tight max-w-2xl mx-auto mb-4">
          Let&apos;s start a <em className="italic text-accent">conversation</em>
        </h1>
        <p className="text-sm sm:text-base text-body max-w-xl mx-auto leading-relaxed">
          Questions, feedback, or partnership ideas — send us a message and we&apos;ll get back to you.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-3xl mx-auto lg:max-w-none">
        {/* Direct info */}
        <div className="lg:col-span-2 rounded-3xl bg-surface border border-line p-8 space-y-6">
          <h2 className="font-display text-xl font-bold text-heading">Reach Us Directly</h2>
          <p className="text-sm text-body leading-relaxed">
            Prefer to connect elsewhere? Find TAPP on GitHub, or explore our
            enterprise services for formal consultation requests.
          </p>
          <div className="space-y-3">
            <a
              href="https://github.com/Anandhumv/tapp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-body hover:text-accent transition-colors"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent/10 border border-line text-accent">
                <Code2 className="w-4 h-4" />
              </span>
              GitHub Repository
            </a>
            <a
              href="/services"
              className="flex items-center gap-3 text-sm text-body hover:text-accent transition-colors"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent/10 border border-line text-accent">
                <Globe className="w-4 h-4" />
              </span>
              Enterprise Services & Consultation
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3 relative rounded-3xl bg-surface border border-line p-6 sm:p-8 shadow-xl overflow-hidden">
          {success && (
            <div className="mb-6 p-6 rounded-2xl bg-accent/10 border border-line-hover text-center animate-in fade-in zoom-in duration-300">
              <div className="w-12 h-12 rounded-full bg-accent/20 text-accent mx-auto flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-heading">Message Sent</h3>
              <p className="text-xs text-body mt-1 max-w-md mx-auto leading-relaxed">
                Thanks for reaching out — we&apos;ll respond via email shortly.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-4 px-4 py-2 rounded-lg bg-bg-alt hover:brightness-95 text-xs font-semibold text-heading transition-colors"
              >
                Send Another Message
              </button>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-500 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                  Name <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-body">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-bg-alt border border-line text-sm text-heading placeholder-body/60 focus:outline-none focus:border-line-hover focus:ring-1 focus:ring-accent/40 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                  Email <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-body">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-bg-alt border border-line text-sm text-heading placeholder-body/60 focus:outline-none focus:border-line-hover focus:ring-1 focus:ring-accent/40 transition-all"
                  />
                </div>
                <span className="text-[10px] text-body mt-1 block">
                  Adheres to TAPP verified policy (supports @gmail.com accounts).
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                  Message <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 pointer-events-none text-body">
                    <MessageSquareText className="w-4 h-4" />
                  </div>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-bg-alt border border-line text-sm text-heading placeholder-body/60 focus:outline-none focus:border-line-hover focus:ring-1 focus:ring-accent/40 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-accent to-accent-strong hover:brightness-110 text-black font-semibold text-xs uppercase tracking-wider shadow-xl shadow-accent/20 transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
