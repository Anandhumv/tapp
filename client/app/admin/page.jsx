"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import {
  ShieldCheck,
  Loader2,
  Mail,
  Building2,
  MessageSquareText,
  Calendar,
  Inbox,
} from "lucide-react";
import { db } from "../../lib/firebase";
import { useAuth } from "../../lib/AuthContext";

export default function AdminPage() {
  const router = useRouter();
  const { user, role, loading: authLoading } = useAuth();

  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || role !== "admin")) {
      router.push("/");
    }
  }, [authLoading, user, role, router]);

  useEffect(() => {
    if (role !== "admin") return;

    const q = query(collection(db, "service_inquiries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setInquiries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoadingInquiries(false);
    });

    return unsubscribe;
  }, [role]);

  if (authLoading || role !== "admin") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 pt-24">
        <Loader2 className="w-7 h-7 animate-spin text-[#c9a978]" />
        <p className="text-xs uppercase tracking-widest text-zinc-400">Verifying access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <ShieldCheck className="w-6 h-6 text-[#c9a978]" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Admin Dashboard
        </h1>
      </div>
      <p className="text-sm text-zinc-400 mb-10">
        Service consultation requests submitted through the Services page.
      </p>

      <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-4">
        <h2 className="text-lg font-semibold text-white">Service Inquiries</h2>
        <span className="text-xs text-zinc-500">{inquiries.length} total</span>
      </div>

      {loadingInquiries ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-[#c9a978]" />
        </div>
      ) : inquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center rounded-2xl border border-white/10 bg-[#131316]">
          <Inbox className="w-8 h-8 text-zinc-600" />
          <p className="text-sm text-zinc-400">No service inquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="rounded-2xl bg-[#131316] border border-white/10 p-5 space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-white">{inq.fullName}</h3>
                  <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                    {inq.organization}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#c9a978]/10 border border-[#c9a978]/20 text-[#c9a978]">
                  {inq.serviceOfInterest}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {inq.email}
                </span>
                {inq.createdAt?.toDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {inq.createdAt.toDate().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                  {inq.status || "new"}
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed flex items-start gap-1.5 pt-2 border-t border-white/5">
                <MessageSquareText className="w-3.5 h-3.5 shrink-0 mt-0.5 text-zinc-500" />
                {inq.projectScope}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
