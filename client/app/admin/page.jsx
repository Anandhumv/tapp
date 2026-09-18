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
  ArrowRight,
  Pencil,
  Boxes,
} from "lucide-react";
import { db } from "../../lib/firebase";
import { useAuth } from "../../lib/AuthContext";

export default function AdminPage() {
  const router = useRouter();
  const { user, role, loading: authLoading } = useAuth();

  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [newMessageCount, setNewMessageCount] = useState(0);
  const [messageTotal, setMessageTotal] = useState(0);

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

    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoadingProjects(false);
    });

    return unsubscribe;
  }, [role]);

  useEffect(() => {
    if (role !== "admin") return;

    const q = query(collection(db, "contact_messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setMessageTotal(snap.size);
      setNewMessageCount(snap.docs.filter((d) => d.data().status !== "resolved").length);
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
          href="/admin/add-project"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-black bg-gradient-to-r from-accent to-accent-strong hover:brightness-110 transition-all shadow-lg shadow-accent/20"
        >
          <Plus className="w-3.5 h-3.5" />
          + Add New Project
        </Link>
      </div>

      <div className="flex items-end justify-between mb-6 border-b border-line pb-4">
        <h2 className="text-lg font-semibold text-heading flex items-center gap-2">
          <Boxes className="w-4 h-4 text-accent" />
          Projects
        </h2>
        <span className="text-xs text-body">{projects.length} total</span>
      </div>

      {loadingProjects ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center rounded-2xl border border-line bg-surface">
          <Inbox className="w-8 h-8 text-body/60" />
          <p className="text-sm text-body">No projects yet.</p>
        </div>
      ) : (
        <div className="space-y-3 mb-14">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 rounded-2xl bg-surface border border-line p-3 sm:p-4"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-14 h-14 rounded-xl object-cover border border-line shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-heading truncate">{project.title}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/10 border border-line-hover text-accent">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-bg-alt border border-line text-body">
                    {project.status || "published"}
                  </span>
                </div>
              </div>
              <Link
                href={`/admin/edit-project/${project.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-alt border border-line hover:border-line-hover text-xs font-medium text-body hover:text-heading transition-all shrink-0"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit</span>
              </Link>
            </div>
          ))}
        </div>
      )}

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

      <div className="mt-14">
        <h2 className="text-lg font-semibold text-heading mb-4">Quick Access</h2>
        <Link
          href="/admin/messages"
          className="group relative flex items-center justify-between gap-4 rounded-2xl bg-surface border border-line hover:border-line-hover p-5 transition-all"
        >
          <div className="flex items-center gap-4">
            <span className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10 border border-line text-accent">
              <Mail className="w-5 h-5" />
              {newMessageCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-black text-[10px] font-bold">
                  {newMessageCount}
                </span>
              )}
            </span>
            <div>
              <h3 className="text-sm font-semibold text-heading">Contact Messages</h3>
              <p className="text-xs text-body">
                {messageTotal} total &middot; {newMessageCount} new
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-body group-hover:text-accent transition-colors" />
        </Link>
      </div>
    </div>
  );
}
