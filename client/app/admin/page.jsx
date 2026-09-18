"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import {
  ShieldCheck,
  Loader2,
  Mail,
  Building2,
  MessageSquareText,
  Calendar,
  Inbox,
  Plus,
  User,
} from "lucide-react";
import { db } from "../../lib/firebase";
import { useAuth } from "../../lib/AuthContext";

export default function AdminPage() {
  const router = useRouter();
  const { user, role, loading: authLoading } = useAuth();

  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

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

  useEffect(() => {
    if (role !== "admin") return;

    const q = query(collection(db, "contact_messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoadingMessages(false);
    });

    return unsubscribe;
  }, [role]);

  if (authLoading || role !== "admin") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 pt-24">
        <Loader2 className="w-7 h-7 animate-spin text-accent" />
        <p className="text-xs uppercase tracking-widest text-body">Verifying access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-accent" />
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-heading">
            Admin Dashboard
          </h1>
        </div>
        <Link
          href="/submit-product"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-black bg-gradient-to-r from-accent to-accent-strong hover:brightness-110 transition-all shadow-lg shadow-accent/20"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Product
        </Link>
      </div>

      <div className="flex items-end justify-between mb-6 border-b border-line pb-4">
        <h2 className="text-lg font-semibold text-heading">Service Inquiries</h2>
        <span className="text-xs text-body">{inquiries.length} total</span>
      </div>

      {loadingInquiries ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
        </div>
      ) : inquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center rounded-2xl border border-line bg-surface">
          <Inbox className="w-8 h-8 text-body/60" />
          <p className="text-sm text-body">No service inquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="rounded-2xl bg-surface border border-line p-5 space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-heading">{inq.fullName}</h3>
                  <p className="text-xs text-body flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                    {inq.organization}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-accent/10 border border-line-hover text-accent">
                  {inq.serviceOfInterest}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-body">
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
                <span className="px-2 py-0.5 rounded-full bg-bg-alt border border-line text-body">
                  {inq.status || "new"}
                </span>
              </div>

              <p className="text-xs text-heading/85 leading-relaxed flex items-start gap-1.5 pt-2 border-t border-line">
                <MessageSquareText className="w-3.5 h-3.5 shrink-0 mt-0.5 text-body" />
                {inq.projectScope}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end justify-between mb-6 mt-14 border-b border-line pb-4">
        <h2 className="text-lg font-semibold text-heading">Contact Messages</h2>
        <span className="text-xs text-body">{messages.length} total</span>
      </div>

      {loadingMessages ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center rounded-2xl border border-line bg-surface">
          <Inbox className="w-8 h-8 text-body/60" />
          <p className="text-sm text-body">No contact messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-2xl bg-surface border border-line p-5 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-heading flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-body" />
                  {msg.name}
                </h3>
                {msg.createdAt?.toDate && (
                  <span className="flex items-center gap-1.5 text-xs text-body">
                    <Calendar className="w-3.5 h-3.5" />
                    {msg.createdAt.toDate().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>

              <span className="flex items-center gap-1.5 text-xs text-body">
                <Mail className="w-3.5 h-3.5" />
                {msg.email}
              </span>

              <p className="text-xs text-heading/85 leading-relaxed flex items-start gap-1.5 pt-2 border-t border-line">
                <MessageSquareText className="w-3.5 h-3.5 shrink-0 mt-0.5 text-body" />
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
