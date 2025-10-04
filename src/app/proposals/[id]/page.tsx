"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Share, Calendar, DollarSign, Clock, Target, CheckCircle, Zap, Users, Award, Rocket, Brain, Star } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";
import { motion } from "framer-motion";
import { useRequireAuth } from "@/hooks/useAuth";

interface Proposal {
  id: string;
  title: string;
  client_name: string;
  client_email: string;
  project_overview: string;
  objectives: string;
  timeline: string;
  budget_range: string;
  technical_requirements: string;
  problems_faced: string;
  our_solution: string;
  pricing_plans: Array<{
    title: string;
    price: string;
    description: string;
    deliverables: string[];
    features: string[];
  }>;
  success_criteria: Array<{
    title: string;
    criteria: string[];
  }>;
  status: "draft" | "sent" | "accepted" | "rejected";
  created_at: string;
  updated_at: string;
}

// Helper function to get all unique features across all plans, with common features first
function getAllFeatures(pricingPlans: Proposal['pricing_plans']): string[] {
  const featureCounts = new Map<string, number>();
  const allFeatures = new Set<string>();
  
  // Count how many plans have each feature
  pricingPlans.forEach(plan => {
    plan.features?.forEach(feature => {
      if (feature.trim()) {
        const trimmedFeature = feature.trim();
        allFeatures.add(trimmedFeature);
        featureCounts.set(trimmedFeature, (featureCounts.get(trimmedFeature) || 0) + 1);
      }
    });
  });
  
  // Sort features: common features first (in all plans), then by frequency, then alphabetically
  return Array.from(allFeatures).sort((a, b) => {
    const countA = featureCounts.get(a) || 0;
    const countB = featureCounts.get(b) || 0;
    const totalPlans = pricingPlans.length;
    
    // If both are in all plans, sort alphabetically
    if (countA === totalPlans && countB === totalPlans) {
      return a.localeCompare(b);
    }
    
    // If one is in all plans, prioritize it
    if (countA === totalPlans) return -1;
    if (countB === totalPlans) return 1;
    
    // Otherwise sort by frequency (descending), then alphabetically
    if (countA !== countB) {
      return countB - countA;
    }
    
    return a.localeCompare(b);
  });
}

export default function ProposalDetailPage() {
  const { user, loading: authLoading } = useRequireAuth();
  const params = useParams();
  const router = useRouter();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id && user) {
      fetchProposal(params.id as string);
    }
  }, [params.id, user]);

  const fetchProposal = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("proposals")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProposal(data);
    } catch (error) {
      console.error("Error fetching proposal:", error);
      router.push("/");
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

  if (!proposal) {
    return (
      <div className="text-center py-12">
        <div className="text-neutral-500 mb-4">Proposal not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            
            <div className="mb-16">
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
                {proposal.title}
              </h1>
              
              <div className="flex items-center justify-center gap-8 mb-12">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{proposal.client_name}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="space-y-20">
          {/* Project Overview */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-3">Project Overview</h2>
              <div className="w-12 h-0.5 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
              {proposal.project_overview}
            </p>
          </motion.section>

          {/* Problems & Solutions */}
          {(proposal.problems_faced || proposal.our_solution) && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-3">Problems & Solutions</h2>
                <div className="w-12 h-0.5 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Problems Faced */}
                {proposal.problems_faced && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                          <Target className="h-5 w-5 text-red-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-red-900">Current Challenges</h3>
                      </div>
                      <p className="text-red-800 leading-relaxed whitespace-pre-wrap">
                        {proposal.problems_faced}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Our Solution */}
                {proposal.our_solution && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative"
                  >
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <Rocket className="h-5 w-5 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-900">Our Solution</h3>
                      </div>
                      <p className="text-green-800 leading-relaxed whitespace-pre-wrap">
                        {proposal.our_solution}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}

          {/* Objectives */}
          {proposal.objectives && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-3">Objectives</h2>
                <div className="w-12 h-0.5 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
                {proposal.objectives}
              </p>
            </motion.section>
          )}

          {/* Pricing Plans Comparison Table */}
          {proposal.pricing_plans && proposal.pricing_plans.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-3">Pricing Plans Comparison</h2>
                <div className="w-12 h-0.5 bg-green-500 rounded-full"></div>
              </div>
              
              {/* Desktop Table */}
              <div className="hidden lg:block">
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-4 gap-0">
                    <div className="p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 border-r border-neutral-200">
                      <h3 className="text-lg font-semibold text-neutral-900">Features</h3>
                    </div>
                    {proposal.pricing_plans.map((plan, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`p-6 text-center border-r border-neutral-200 last:border-r-0 ${
                          index === 1 ? 'bg-gradient-to-br from-primary/5 to-secondary/5' : 'bg-gradient-to-br from-neutral-50 to-neutral-100'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-3">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <h4 className="text-lg font-bold text-neutral-900 mb-2">{plan.title}</h4>
                        <div className="text-2xl font-bold text-primary mb-2">{plan.price}</div>
                        {plan.description && (
                          <p className="text-sm text-neutral-600">{plan.description}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Features Rows */}
                  {getAllFeatures(proposal.pricing_plans).map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: featureIndex * 0.05 }}
                      className="grid grid-cols-4 gap-0 border-t border-neutral-200 hover:bg-neutral-50/50 transition-colors"
                    >
                      <div className="p-4 border-r border-neutral-200 flex items-center">
                        <span className="text-sm font-medium text-neutral-900">{feature}</span>
                      </div>
                      {proposal.pricing_plans.map((plan, planIndex) => (
                        <div key={planIndex} className="p-4 border-r border-neutral-200 last:border-r-0 flex items-center justify-center">
                          {plan.features?.includes(feature) ? (
                            <span className="text-green-600 font-semibold text-lg">✓</span>
                          ) : (
                            <span className="text-neutral-400 font-semibold text-lg">—</span>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-6">
                {proposal.pricing_plans.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className={`relative bg-white rounded-xl p-6 border border-neutral-200 shadow-sm ${
                      index === 1 ? 'ring-2 ring-green-200' : ''
                    }`}>
                      
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-4">
                          <Award className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">
                          {plan.title}
                        </h3>
                        <div className="text-3xl font-bold text-primary mb-3">
                          {plan.price}
                        </div>
                        {plan.description && (
                          <p className="text-neutral-600 leading-relaxed mb-4">
                            {plan.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Features List */}
                      {plan.features && plan.features.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-neutral-900 mb-3">
                            Features Included
                          </h4>
                          <ul className="space-y-2">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="text-sm text-neutral-700 flex items-start gap-3">
                                <span className="text-green-600 font-semibold mt-0.5 flex-shrink-0">✓</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Technical Requirements */}
          {proposal.technical_requirements && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-3">Technical Requirements</h2>
                <div className="w-12 h-0.5 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
                {proposal.technical_requirements}
              </p>
            </motion.section>
          )}

          {/* Success Criteria */}
          {proposal.success_criteria && proposal.success_criteria.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-3">Success Criteria</h2>
                <div className="w-12 h-0.5 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {proposal.success_criteria.map((criteriaGroup, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                        {criteriaGroup.title}
                      </h3>
                      <ul className="space-y-3">
                        {criteriaGroup.criteria.map((criterion, idx) => (
                          <li key={idx} className="text-neutral-700 flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                            {criterion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

        </div>
      </div>
    </div>
  );
}
