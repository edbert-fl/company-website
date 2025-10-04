"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Eye, Calendar, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import { useRequireAuth } from "@/hooks/useAuth";

interface Proposal {
  id: string;
  title: string;
  client_name: string;
  status: "draft" | "sent" | "accepted" | "rejected";
  created_at: string;
  updated_at: string;
}

export default function ProposalsPage() {
  const { user, loading: authLoading, signOut } = useRequireAuth();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProposals();
    }
  }, [user]);

  const fetchProposals = async () => {
    try {
      const { data, error } = await supabase
        .from("proposals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProposals(data || []);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-neutral-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to home page
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-neutral-900">
          All Proposals ({proposals.length})
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-4 py-2 font-medium hover:bg-neutral-100 transition-colors text-neutral-700"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
          <Link
            href="/proposals/create"
            className="inline-flex items-center gap-2 rounded-md bg-primary text-white px-4 py-2 font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Proposal
          </Link>
        </div>
      </div>

      {proposals.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-neutral-500 mb-4">No proposals yet</div>
          <Link
            href="/proposals/create"
            className="inline-flex items-center gap-2 rounded-md bg-primary text-white px-4 py-2 font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create your first proposal
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              className="rounded-xl border border-neutral-200 bg-white p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-neutral-900 line-clamp-2">
                  {proposal.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    proposal.status === "draft"
                      ? "bg-neutral-100 text-neutral-700"
                      : proposal.status === "sent"
                      ? "bg-blue-100 text-blue-700"
                      : proposal.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {proposal.status}
                </span>
              </div>
              <div className="text-sm text-neutral-600 mb-4">
                Client: {proposal.client_name}
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-4">
                <Calendar className="h-3 w-3" />
                Created {new Date(proposal.created_at).toLocaleDateString()}
              </div>
              <Link
                href={`/proposals/${proposal.id}`}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                <Eye className="h-4 w-4" />
                View Proposal
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
