"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, FileText, Upload, Plus, Trash2, Target, DollarSign, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";
import { useRequireAuth } from "@/hooks/useAuth";

export default function CreateProposalPage() {
  const { user, loading: authLoading } = useRequireAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [showJsonInput, setShowJsonInput] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    client_name: "",
    client_email: "",
    project_overview: "",
    problems_faced: "",
    our_solution: "",
    objectives: "",
    timeline: "",
    budget_range: "",
    technical_requirements: "",
    pricing_plans: [
      {
        title: "Essentials",
        price: "",
        description: "",
        deliverables: [""],
        features: [""]
      }
    ],
    success_criteria: [
      {
        title: "Performance Metrics",
        criteria: [""]
      }
    ]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("proposals")
        .insert([
          {
            ...formData,
            status: "draft",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      router.push(`/proposals/${data.id}`);
    } catch (error) {
      console.error("Error creating proposal:", error);
      alert("Failed to create proposal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleJsonImport = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setFormData({
        title: parsed.title || "",
        client_name: parsed.client_name || "",
        client_email: parsed.client_email || "",
        project_overview: parsed.project_overview || "",
        problems_faced: parsed.problems_faced || "",
        our_solution: parsed.our_solution || "",
        objectives: parsed.objectives || "",
        timeline: parsed.timeline || "",
        budget_range: parsed.budget_range || "",
        technical_requirements: parsed.technical_requirements || "",
        pricing_plans: parsed.pricing_plans || [
          {
            title: "Essentials",
            price: "",
            description: "",
            deliverables: [""],
            features: [""]
          }
        ],
        success_criteria: parsed.success_criteria || [
          {
            title: "Performance Metrics",
            criteria: [""]
          }
        ]
      });
      setShowJsonInput(false);
      setJsonInput("");
    } catch {
      alert("Invalid JSON format. Please check your input.");
    }
  };

  const generateJsonTemplate = () => {
    const template = {
      title: "AI-Powered Customer Service Automation Platform",
      client_name: "TechCorp Solutions",
      client_email: "contact@techcorp.com",
      project_overview: "Develop a comprehensive AI-powered customer service automation platform that integrates seamlessly with existing business systems. The solution will leverage advanced natural language processing to provide intelligent, context-aware responses while maintaining human oversight capabilities.",
      problems_faced: "Currently experiencing high customer service costs, slow response times averaging 4+ hours, inconsistent service quality across different agents, inability to scale support during peak periods, and lack of 24/7 availability. Manual processes are creating bottlenecks and customer dissatisfaction.",
      our_solution: "Our AI-powered automation platform will provide instant, intelligent responses to customer inquiries, reduce response time to under 2 seconds, ensure consistent service quality, enable 24/7 availability, and seamlessly escalate complex issues to human agents when needed. This will dramatically improve customer satisfaction while reducing operational costs.",
      objectives: "Transform customer service operations through AI automation, achieving 80% reduction in response time, 95% customer satisfaction scores, and 50% cost reduction while maintaining service quality and enabling seamless human handoff when needed.",
      timeline: "4 months (16 weeks)",
      budget_range: "$75,000 - $125,000",
      technical_requirements: "Python 3.9+, React 18+, Next.js 14+, PostgreSQL 15+, Redis, AWS (EC2, RDS, S3, Lambda), OpenAI GPT-4 API, Docker, Kubernetes, CI/CD pipeline with GitHub Actions, comprehensive monitoring with DataDog",
      pricing_plans: [
        {
          title: "Starter",
          price: "$25,000",
          description: "Essential AI chatbot with core automation features and basic integrations. Perfect for small to medium businesses looking to automate initial customer interactions.",
          deliverables: [
            "AI chatbot with natural language processing",
            "Basic conversation flow design and implementation",
            "Integration with 2 existing systems (CRM, email)",
            "Simple analytics dashboard",
            "Basic training data preparation",
            "User documentation and setup guide"
          ],
          features: [
            "Natural language processing",
            "Basic conversation flow",
            "Email notifications",
            "Basic analytics dashboard",
            "CRM integration (Salesforce/HubSpot)",
            "Multi-language support (English, Spanish)",
            "Basic sentiment analysis",
            "Standard business hours support"
          ]
        },
        {
          title: "Professional",
          price: "$55,000",
          description: "Advanced AI system with comprehensive integrations, advanced analytics, and custom training capabilities. Ideal for growing businesses requiring sophisticated automation.",
          deliverables: [
            "Advanced AI chatbot with custom training",
            "Full CRM and business system integration",
            "Custom conversation flow design",
            "Advanced analytics and reporting dashboard",
            "API documentation and developer tools",
            "Custom training data preparation and optimization",
            "Integration testing and quality assurance",
            "Comprehensive user training sessions"
          ],
          features: [
            "Natural language processing",
            "Advanced conversation flow",
            "Multi-channel support (email, chat, phone, social)",
            "CRM integration (Salesforce, HubSpot, Pipedrive)",
            "Advanced analytics dashboard",
            "Custom model training and fine-tuning",
            "Priority support (4-hour response)",
            "API access and webhooks",
            "Multi-language support (5 languages)",
            "Advanced sentiment analysis",
            "Escalation to human agents",
            "Custom branding and white-label options"
          ]
        },
        {
          title: "Enterprise",
          price: "$95,000",
          description: "Complete enterprise-grade AI solution with unlimited customizations, dedicated support, and advanced security features. Designed for large organizations with complex requirements.",
          deliverables: [
            "Enterprise-grade AI system with custom architecture",
            "Unlimited custom integrations and APIs",
            "Dedicated project manager and technical team",
            "Advanced security implementation (SOC 2 compliance)",
            "White-label solution with custom branding",
            "Complete documentation and training materials",
            "On-site training sessions for your team",
            "6-month post-launch support and optimization",
            "Custom reporting and business intelligence tools"
          ],
          features: [
            "Natural language processing",
            "Advanced conversation flow",
            "Multi-channel support (email, chat, phone, social, SMS)",
            "CRM integration (Salesforce, HubSpot, Pipedrive, Microsoft Dynamics)",
            "Advanced analytics dashboard",
            "Custom model training and fine-tuning",
            "Dedicated account manager",
            "API access and webhooks",
            "Multi-language support (10+ languages)",
            "Advanced sentiment analysis",
            "Escalation to human agents",
            "Custom branding and white-label options",
            "Advanced security and compliance features",
            "24/7 priority support",
            "Custom integrations and workflows",
            "Advanced reporting and business intelligence",
            "Scalable infrastructure with auto-scaling",
            "Data export and migration tools"
          ]
        }
      ],
      success_criteria: [
        {
          title: "Performance Metrics",
          criteria: [
            "Response time under 2 seconds for 95% of queries",
            "95% accuracy in intent recognition and response relevance",
            "Customer satisfaction score above 4.5/5 stars",
            "System uptime of 99.9% or higher",
            "Processing capacity of 1000+ concurrent conversations"
          ]
        },
        {
          title: "Business Impact",
          criteria: [
            "80% reduction in first-response time",
            "50% decrease in support operational costs",
            "25% increase in customer retention rates",
            "90% automation rate for common inquiries",
            "40% improvement in customer satisfaction scores"
          ]
        },
        {
          title: "Technical Requirements",
          criteria: [
            "Integration with existing CRM systems within 2 weeks",
            "API response time under 500ms",
            "Support for 10,000+ daily interactions",
            "Data security compliance (GDPR, SOC 2)",
            "Seamless handoff to human agents when needed"
          ]
        }
      ]
    };
    setJsonInput(JSON.stringify(template, null, 2));
  };

  // Helper functions for managing pricing plans
  const addPricingPlan = () => {
    setFormData({
      ...formData,
      pricing_plans: [
        ...formData.pricing_plans,
        {
          title: "",
          price: "",
          description: "",
          deliverables: [""],
          features: [""]
        }
      ]
    });
  };

  const removePricingPlan = (index: number) => {
    setFormData({
      ...formData,
      pricing_plans: formData.pricing_plans.filter((_, i) => i !== index)
    });
  };

  const updatePricingPlan = (index: number, field: string, value: string) => {
    const updatedPlans = [...formData.pricing_plans];
    updatedPlans[index] = { ...updatedPlans[index], [field]: value };
    setFormData({ ...formData, pricing_plans: updatedPlans });
  };

  const addDeliverable = (planIndex: number) => {
    const updatedPlans = [...formData.pricing_plans];
    updatedPlans[planIndex].deliverables.push("");
    setFormData({ ...formData, pricing_plans: updatedPlans });
  };

  const removeDeliverable = (planIndex: number, deliverableIndex: number) => {
    const updatedPlans = [...formData.pricing_plans];
    updatedPlans[planIndex].deliverables = updatedPlans[planIndex].deliverables.filter((_, i) => i !== deliverableIndex);
    setFormData({ ...formData, pricing_plans: updatedPlans });
  };

  const updateDeliverable = (planIndex: number, deliverableIndex: number, value: string) => {
    const updatedPlans = [...formData.pricing_plans];
    updatedPlans[planIndex].deliverables[deliverableIndex] = value;
    setFormData({ ...formData, pricing_plans: updatedPlans });
  };

  const addFeature = (planIndex: number) => {
    const updatedPlans = [...formData.pricing_plans];
    updatedPlans[planIndex].features.push("");
    setFormData({ ...formData, pricing_plans: updatedPlans });
  };

  const removeFeature = (planIndex: number, featureIndex: number) => {
    const updatedPlans = [...formData.pricing_plans];
    updatedPlans[planIndex].features = updatedPlans[planIndex].features.filter((_, i) => i !== featureIndex);
    setFormData({ ...formData, pricing_plans: updatedPlans });
  };

  const updateFeature = (planIndex: number, featureIndex: number, value: string) => {
    const updatedPlans = [...formData.pricing_plans];
    updatedPlans[planIndex].features[featureIndex] = value;
    setFormData({ ...formData, pricing_plans: updatedPlans });
  };

  // Helper functions for managing success criteria
  const addSuccessCriteria = () => {
    setFormData({
      ...formData,
      success_criteria: [
        ...formData.success_criteria,
        {
          title: "",
          criteria: [""]
        }
      ]
    });
  };

  const removeSuccessCriteria = (index: number) => {
    setFormData({
      ...formData,
      success_criteria: formData.success_criteria.filter((_, i) => i !== index)
    });
  };

  const updateSuccessCriteria = (index: number, field: string, value: string) => {
    const updatedCriteria = [...formData.success_criteria];
    updatedCriteria[index] = { ...updatedCriteria[index], [field]: value };
    setFormData({ ...formData, success_criteria: updatedCriteria });
  };

  const addCriterion = (criteriaIndex: number) => {
    const updatedCriteria = [...formData.success_criteria];
    updatedCriteria[criteriaIndex].criteria.push("");
    setFormData({ ...formData, success_criteria: updatedCriteria });
  };

  const removeCriterion = (criteriaIndex: number, criterionIndex: number) => {
    const updatedCriteria = [...formData.success_criteria];
    updatedCriteria[criteriaIndex].criteria = updatedCriteria[criteriaIndex].criteria.filter((_, i) => i !== criterionIndex);
    setFormData({ ...formData, success_criteria: updatedCriteria });
  };

  const updateCriterion = (criteriaIndex: number, criterionIndex: number, value: string) => {
    const updatedCriteria = [...formData.success_criteria];
    updatedCriteria[criteriaIndex].criteria[criterionIndex] = value;
    setFormData({ ...formData, success_criteria: updatedCriteria });
  };

  if (authLoading) {
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-12">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-neutral-900">Create New Proposal</h1>
            </div>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-6">
              Build comprehensive project proposals with detailed pricing plans, features, and success criteria. 
              Use our form or import from JSON for faster setup.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setShowJsonInput(!showJsonInput)}
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium transition-all ${
                  showJsonInput 
                    ? "bg-primary text-white shadow-lg" 
                    : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                <FileText className="h-4 w-4" />
                {showJsonInput ? "Switch to Form" : "Import from JSON"}
              </button>
              <div className="text-sm text-neutral-500">
                {showJsonInput ? "Paste your JSON data" : "Fill out the form fields"}
              </div>
            </div>
          </div>
        </div>

        {/* JSON Import Section */}
        {showJsonInput && (
          <div className="mb-8 rounded-2xl border border-neutral-200/50 bg-white/80 backdrop-blur p-8 shadow-sm">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <Upload className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">Import from JSON</h3>
              </div>
              <p className="text-neutral-600 mb-6">
                Paste your proposal data in JSON format below. This will populate all form fields automatically.
              </p>
              
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={generateJsonTemplate}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 text-sm font-medium text-primary hover:from-primary/20 hover:to-secondary/20 transition-all"
                >
                  <FileText className="h-4 w-4" />
                  Load Template
                </button>
                <div className="text-sm text-neutral-500">
                  Use our comprehensive template as a starting point
                </div>
              </div>
            </div>
            
            <div className="relative">
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={15}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm bg-neutral-50/50 resize-none"
                placeholder="Paste your JSON here..."
              />
              <div className="absolute top-3 right-3 text-xs text-neutral-400 font-mono">
                JSON
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-neutral-500">
                {jsonInput.trim() ? `${jsonInput.split('\n').length} lines` : 'No content'}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowJsonInput(false);
                    setJsonInput("");
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleJsonImport}
                  disabled={!jsonInput.trim()}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="h-4 w-4" />
                  Import to Form
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white/80 backdrop-blur rounded-2xl border border-neutral-200/50 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <FileText className="h-4 w-4 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-900">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-3">
                  Proposal Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white/50 transition-all"
                  placeholder="e.g., AI Chatbot Implementation"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-3">
                  Client Name *
                </label>
                <input
                  type="text"
                  name="client_name"
                  required
                  value={formData.client_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white/50 transition-all"
                  placeholder="e.g., Acme Corporation"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Client Email
              </label>
              <input
                type="email"
                name="client_email"
                value={formData.client_email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white/50 transition-all"
                placeholder="client@company.com"
              />
            </div>
          </div>

        {/* Project Details */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-neutral-200/50 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <Target className="h-4 w-4 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">Project Details</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Project Overview *
              </label>
              <textarea
                name="project_overview"
                required
                rows={4}
                value={formData.project_overview}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white/50 transition-all resize-none"
                placeholder="Describe the project goals, challenges, and desired outcomes..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Current Problems & Challenges
              </label>
              <textarea
                name="problems_faced"
                rows={3}
                value={formData.problems_faced}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white/50 transition-all resize-none"
                placeholder="Describe the current problems, pain points, and challenges the client is facing..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Our Solution
              </label>
              <textarea
                name="our_solution"
                rows={3}
                value={formData.our_solution}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white/50 transition-all resize-none"
                placeholder="Explain how your solution addresses the problems and provides value..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Objectives
              </label>
              <textarea
                name="objectives"
                rows={3}
                value={formData.objectives}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white/50 transition-all resize-none"
                placeholder="List the key objectives and success criteria..."
              />
            </div>
          </div>
        </div>

        {/* Pricing Plans Section */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-neutral-200/50 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">Pricing Plans</h2>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Configure Your Plans</h3>
            <button
              type="button"
              onClick={addPricingPlan}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 text-sm font-medium text-primary hover:from-primary/20 hover:to-secondary/20 transition-all"
            >
              <Plus className="h-4 w-4" />
              Add Plan
            </button>
          </div>
          <div className="space-y-6">
            {formData.pricing_plans.map((plan, planIndex) => (
              <div key={planIndex} className="rounded-xl border border-neutral-200 bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-semibold text-neutral-900">Plan {planIndex + 1}</h4>
                  {formData.pricing_plans.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePricingPlan(planIndex)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Plan Title *
                    </label>
                    <input
                      type="text"
                      value={plan.title}
                      onChange={(e) => updatePricingPlan(planIndex, "title", e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., Essentials, Premium, Enterprise"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Price *
                    </label>
                    <input
                      type="text"
                      value={plan.price}
                      onChange={(e) => updatePricingPlan(planIndex, "price", e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., $25,000"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={plan.description}
                    onChange={(e) => updatePricingPlan(planIndex, "description", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Brief description of this plan..."
                  />
                </div>
                
                {/* Deliverables */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Deliverables
                    </label>
                    <button
                      type="button"
                      onClick={() => addDeliverable(planIndex)}
                      className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-200 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {plan.deliverables.map((deliverable, deliverableIndex) => (
                      <div key={deliverableIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={deliverable}
                          onChange={(e) => updateDeliverable(planIndex, deliverableIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter deliverable..."
                        />
                        {plan.deliverables.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDeliverable(planIndex, deliverableIndex)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Features
                    </label>
                    <button
                      type="button"
                      onClick={() => addFeature(planIndex)}
                      className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-200 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(planIndex, featureIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter feature..."
                        />
                        {plan.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFeature(planIndex, featureIndex)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Timeline & Budget */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-neutral-200/50 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
              <Clock className="h-4 w-4 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">Project Timeline & Budget</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Timeline
              </label>
              <input
                type="text"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white/50 transition-all"
                placeholder="e.g., 3-6 months"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Budget Range
              </label>
              <input
                type="text"
                name="budget_range"
                value={formData.budget_range}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white/50 transition-all"
                placeholder="e.g., $50,000 - $100,000"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              Technical Requirements
            </label>
            <textarea
              name="technical_requirements"
              rows={3}
              value={formData.technical_requirements}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white/50 transition-all resize-none"
              placeholder="List technical specifications, integrations, and constraints..."
            />
          </div>
        </div>

        {/* Success Criteria Section */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-neutral-200/50 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">Success Criteria</h2>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Define Success Metrics</h3>
            <button
              type="button"
              onClick={addSuccessCriteria}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 text-sm font-medium text-primary hover:from-primary/20 hover:to-secondary/20 transition-all"
            >
              <Plus className="h-4 w-4" />
              Add Criteria Group
            </button>
          </div>
          <div className="space-y-6">
            {formData.success_criteria.map((criteriaGroup, criteriaIndex) => (
              <div key={criteriaIndex} className="rounded-xl border border-neutral-200 bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-semibold text-neutral-900">Criteria Group {criteriaIndex + 1}</h4>
                  {formData.success_criteria.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSuccessCriteria(criteriaIndex)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Group Title *
                  </label>
                  <input
                    type="text"
                    value={criteriaGroup.title}
                    onChange={(e) => updateSuccessCriteria(criteriaIndex, "title", e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Performance Metrics, Business Impact, Technical Requirements"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Criteria
                    </label>
                    <button
                      type="button"
                      onClick={() => addCriterion(criteriaIndex)}
                      className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-200 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {criteriaGroup.criteria.map((criterion, criterionIndex) => (
                      <div key={criterionIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={criterion}
                          onChange={(e) => updateCriterion(criteriaIndex, criterionIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter success criterion..."
                        />
                        {criteriaGroup.criteria.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCriterion(criteriaIndex, criterionIndex)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Section */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-neutral-200/50 p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Ready to Create?</h3>
              <p className="text-neutral-600">Review your proposal details and submit to create your interactive proposal.</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/proposals"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-6 py-3 text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                {loading ? "Creating..." : "Create Proposal"}
              </button>
            </div>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}
