"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  ArrowLeft,
  Mail,
  ExternalLink,
  Calendar,
  Loader2,
  Inbox,
  CheckCircle2,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { db } from "../../../lib/firebase";
import { useAuth } from "../../../lib/AuthContext";

export default function AdminMessagesPage() {
  const router = useRouter();
  const { user, role, loading: authLoading } = useAuth();

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (!authLoading && (!user || role !== "admin")) {
      router.push("/login");
    }
  }, [authLoading, user, role, router]);

  useEffect(() => {
    if (role !== "admin") return;

    const q = query(collection(db, "contact_messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoadingMessages(false);
    });

    return unsubscribe;
  }, [role]);

  const toggleStatus = async (msg) => {
    setUpdatingId(msg.id);
    try {
      await updateDoc(doc(db, "contact_messages", msg.id), {
        status: msg.status === "resolved" ? "new" : "resolved",
      });
    } catch (err) {
      console.error("Error updating message status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (msg) => {
    const confirmed = window.confirm(
      `Delete the message from ${msg.name || msg.email}? This cannot be undone.`
    );
    if (!confirmed) return;

    setUpdatingId(msg.id);
    try {
      await deleteDoc(doc(db, "contact_messages", msg.id));
    } catch (err) {
      console.error("Error deleting message:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (authLoading || !user || role !== "admin") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 pt-24">
        <Loader2 className="w-7 h-7 animate-spin text-accent" />
        <p className="text-xs uppercase tracking-widest text-body">Verifying access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-body hover:text-accent transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Admin Dashboard</span>
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <Mail className="w-6 h-6 text-accent" />
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-heading">
          Contact Messages
        </h1>
      </div>
      <p className="text-sm text-body mb-10">
        Messages submitted through the Contact page.
      </p>

      <div className="flex items-end justify-between mb-6 border-b border-line pb-4">
        <h2 className="text-lg font-semibold text-heading">Inbox</h2>
        <span className="text-xs text-body">{messages.length} total</span>
      </div>

      {loadingMessages ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center rounded-2xl border border-line bg-surface">
          <Inbox className="w-8 h-8 text-body/60" />
          <p className="text-sm text-body">No incoming messages found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => {
            const isResolved = msg.status === "resolved";
            const isBusy = updatingId === msg.id;

            return (
              <div
                key={msg.id}
                className="rounded-2xl bg-surface border border-line p-5 space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          isResolved
                            ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-500"
                            : "bg-accent/10 border-line-hover text-accent"
                        }`}
                      >
                        {isResolved ? "Resolved" : "New"}
                      </span>
                      {msg.createdAt?.toDate && (
                        <span className="flex items-center gap-1.5 text-[11px] text-body">
                          <Calendar className="w-3 h-3" />
                          {msg.createdAt.toDate().toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-heading">{msg.name}</h3>
                    <a
                      href={`mailto:${msg.email}`}
                      className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-strong hover:underline transition-colors mt-0.5"
                    >
                      {msg.email}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    {msg.subject && (
                      <p className="text-xs font-semibold text-heading mt-2">{msg.subject}</p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-heading/85 leading-relaxed whitespace-pre-wrap rounded-xl bg-bg-alt border border-line p-4">
                  {msg.message}
                </p>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => toggleStatus(msg)}
                    disabled={isBusy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-alt border border-line hover:border-line-hover text-xs font-medium text-body hover:text-heading transition-all disabled:opacity-50"
                  >
                    {isResolved ? (
                      <RotateCcw className="w-3.5 h-3.5" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                    {isResolved ? "Mark as New" : "Mark as Resolved"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(msg)}
                    disabled={isBusy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 hover:border-red-500/50 text-xs font-medium text-red-500 transition-all disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
