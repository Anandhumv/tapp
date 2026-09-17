"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  Cpu,
  Layers,
  Sparkles,
  Users2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  Mail,
  User,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { db } from "../../lib/firebase";
import { useAuth } from "../../lib/AuthContext";
import { validateEmail } from "../../lib/validateEmail";

const servicesList = [
  {
    id: "sourcing",
    title: "Bespoke Hardware Sourcing",
    tagline: "Procure the impossible.",
    description:
      "Custom procurement of exotic compute, neural coprocessors, quantum accelerators, and next-gen robotic components tailored for elite engineering labs.",
    icon: Cpu,
    highlights: [
      "Sub-micron silicon & TPU allocation",
      "Defense & industrial supply chain access",
      "Direct OEM foundry relationships",
    ],
  },
  {
    id: "integration",
    title: "Architecture & Systems Integration",
    tagline: "End-to-end technical execution.",
    description:
      "Advisory and hands-on systems architecture for autonomous robotics, clean-tech energy routers, and mission-critical distributed telemetry.",
    icon: Layers,
    highlights: [
      "Hardware-software co-design & firmware",
      "Low-latency CRDT & edge synchronization",
      "Thermal, battery & power optimization",
    ],
  },
  {
    id: "showcase",
    title: "VIP Showcase & Curation",
    tagline: "Elevate your breakthrough to enterprise buyers.",
    description:
      "Expedited editorial review, in-depth architectural breakdown, and prime front-page curation on TAPP for breakthrough hardware and AI ventures.",
    icon: Sparkles,
    highlights: [
      "Priority 24h curation review",
      "Verified Supplier verification badge",
      "Dedicated investor & enterprise distribution",
    ],
  },
  {
    id: "advisory",
    title: "Executive Advisory & Private Demos",
    tagline: "Strategic market acceleration.",
    description:
      "Connecting founders, lab directors, and deep-tech inventors directly with qualified venture syndicates, corporate buyers, and institutional partners.",
    icon: Users2,
    highlights: [
      "Confidential private demo roundtables",
      "Enterprise pilot contract structures",
      "Cross-border clean-tech regulatory guidance",
    ],
  },
];

export default function ServicesPage() {
  const { user } = useAuth();
  const formRef = useRef(null);

  const [fullName, setFullName] = useState(user?.displayName || "");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [selectedService, setSelectedService] = useState("Bespoke Hardware Sourcing");
  const [projectScope, setProjectScope] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleServiceSelect = (serviceTitle) => {
    setSelectedService(serviceTitle);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Form field validation
    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!organization.trim()) {
      setErrorMessage("Please specify your company or organization.");
      return;
    }

    // Validate email according to TAPP policies
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setErrorMessage(emailValidation.error || "Please enter a valid @gmail.com email address.");
      return;
    }

    if (!projectScope.trim()) {
      setErrorMessage("Please describe your project scope or consultation requirements.");
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, "service_inquiries"), {
        fullName: fullName.trim(),
        organization: organization.trim(),
        email: emailValidation.cleanEmail,
        serviceOfInterest: selectedService,
        projectScope: projectScope.trim(),
        userId: user ? user.uid : null,
        status: "new",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setProjectScope("");
      if (!user) {
        setFullName("");
        setOrganization("");
        setEmail("");
      }
    } catch (err) {
      console.error("Error submitting service inquiry:", err);
      setErrorMessage(err.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <section className="text-center relative pt-8 pb-16 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-accent/15 blur-[130px] rounded-full pointer-events-none" />

        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-line text-accent text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Enterprise Services & Bespoke Engineering</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-heading leading-tight max-w-4xl mx-auto mb-6">
          Architecting the Future of{" "}
          <em className="italic text-accent">Hardware & Deep-Tech</em>
        </h1>

        <p className="text-sm sm:text-base text-body max-w-2xl mx-auto leading-relaxed">
          From exotic neural silicon procurement to turnkey systems integration, we empower
          visionary teams with high-touch technical acceleration and elite market distribution.
        </p>
      </section>

      {/* Services Bento Grid */}
      <section className="mb-24">
        <div className="flex items-end justify-between mb-8 border-b border-line pb-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-accent font-semibold">
              Capabilities
            </span>
            <h2 className="font-display text-2xl font-bold text-heading mt-1">Core Service Offerings</h2>
          </div>
          <span className="text-xs text-body">4 Specialized Practices</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesList.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="group relative rounded-3xl bg-surface border border-line hover:border-line-hover p-8 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-line text-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-body group-hover:text-accent transition-colors">
                      {svc.tagline}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-heading mb-2 group-hover:text-accent transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-body leading-relaxed mb-6">
                    {svc.description}
                  </p>

                  <div className="space-y-2 mb-8 pt-4 border-t border-line">
                    {svc.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-heading/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => handleServiceSelect(svc.title)}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-bg-alt border border-line hover:border-line-hover text-xs font-semibold text-heading transition-all cursor-pointer"
                  >
                    <span>Request This Practice</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Consultation Form Section */}
      <section ref={formRef} className="max-w-3xl mx-auto scroll-mt-28">
        <div className="relative rounded-3xl bg-surface border border-line p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/15 blur-[100px] rounded-full pointer-events-none" />

          <div className="text-center mb-8">
            <span className="inline-block text-[11px] uppercase tracking-widest text-accent font-bold mb-2">
              Inquiry & Advisory
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading tracking-tight">
              Request a Consultation
            </h2>
            <p className="text-xs sm:text-sm text-body max-w-lg mx-auto mt-2">
              Connect directly with our engineering and curation team to review scopes, timelines, and tailored allocations.
            </p>
          </div>

          {/* Success Banner */}
          {success && (
            <div className="mb-8 p-6 rounded-2xl bg-accent/10 border border-line-hover text-center animate-in fade-in zoom-in duration-300">
              <div className="w-12 h-12 rounded-full bg-accent/20 text-accent mx-auto flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-heading">Inquiry Dispatched Successfully</h3>
              <p className="text-xs text-body mt-1 max-w-md mx-auto leading-relaxed">
                Thank you. Our executive team has received your consultation request and will reach out via email within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-4 px-4 py-2 rounded-lg bg-bg-alt hover:brightness-95 text-xs font-semibold text-heading transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-500 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-body">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Dr. Evelyn Stone"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-bg-alt border border-line text-sm text-heading placeholder-body/60 focus:outline-none focus:border-line-hover focus:ring-1 focus:ring-accent/40 transition-all"
                    />
                  </div>
                </div>

                {/* Organization / Company */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                    Organization / Lab <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-body">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="OmniDynamics Labs"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-bg-alt border border-line text-sm text-heading placeholder-body/60 focus:outline-none focus:border-line-hover focus:ring-1 focus:ring-accent/40 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                    Corporate / Authenticated Email <span className="text-accent">*</span>
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
                      placeholder="evelyn@gmail.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-bg-alt border border-line text-sm text-heading placeholder-body/60 focus:outline-none focus:border-line-hover focus:ring-1 focus:ring-accent/40 transition-all"
                    />
                  </div>
                  <span className="text-[10px] text-body mt-1 block">
                    Adheres to TAPP verified policy (supports @gmail.com accounts).
                  </span>
                </div>

                {/* Service of Interest Dropdown */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                    Service of Interest
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-bg-alt border border-line text-sm text-heading focus:outline-none focus:border-line-hover focus:ring-1 focus:ring-accent/40 transition-all"
                  >
                    <option value="Bespoke Hardware Sourcing">Bespoke Hardware Sourcing</option>
                    <option value="Architecture & Systems Integration">Architecture & Systems Integration</option>
                    <option value="VIP Showcase & Curation">VIP Showcase & Curation</option>
                    <option value="Executive Advisory & Private Demos">Executive Advisory & Private Demos</option>
                    <option value="General Enterprise Advisory">General Enterprise Advisory</option>
                  </select>
                </div>
              </div>

              {/* Project Scope / Overview */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                  Project Scope / Overview <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 pointer-events-none text-body">
                    <MessageSquareText className="w-4 h-4" />
                  </div>
                  <textarea
                    rows={4}
                    required
                    value={projectScope}
                    onChange={(e) => setProjectScope(e.target.value)}
                    placeholder="Describe your technical specifications, estimated volumes, target timelines, or strategic advisory goals..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-bg-alt border border-line text-sm text-heading placeholder-body/60 focus:outline-none focus:border-line-hover focus:ring-1 focus:ring-accent/40 transition-all"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-accent to-accent-strong hover:brightness-110 text-black font-semibold text-xs uppercase tracking-wider shadow-xl shadow-accent/20 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Consultation Request</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
