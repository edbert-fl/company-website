"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  ShieldCheck,
  MessageSquare,
  Workflow,
  ImageIcon,
  Brain,
} from "lucide-react";
import Link from "next/link";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

function NavBar() {
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div
            className="h-8 w-8 rounded"
            style={{
              background: "linear-gradient(to bottom right, #4D7373, #8EBFB6)",
            }}
          />
          <span className="text-lg font-semibold tracking-tight text-neutral-900">
            DeepCurrent
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-md border border-neutral-300 hover:bg-neutral-100 transition-colors text-neutral-900"
          >
            Contact
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Typewriter({
  words,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseMs = 1200,
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    const isWordComplete = text === currentWord;
    const isCleared = text === "";

    let timeout: NodeJS.Timeout;

    if (!isDeleting && !isWordComplete) {
      timeout = setTimeout(
        () => setText(currentWord.slice(0, text.length + 1)),
        typingSpeed
      );
    } else if (!isDeleting && isWordComplete) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && !isCleared) {
      timeout = setTimeout(
        () => setText(currentWord.slice(0, text.length - 1)),
        deletingSpeed
      );
    } else if (isDeleting && isCleared) {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, words, wordIndex, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className="inline-flex items-baseline whitespace-nowrap">
      <span key={text} className="auto font-semibold text-primary">
        {text}
      </span>
      <br />
      <span className="ml-0.5 h-[1.1em] w-[2px] bg-neutral-900 animate-pulse" />
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="relative flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-muted">
          <div className="mx-auto max-w-7xl px-6 pt-14 sm:pt-16 lg:pt-24 pb-16 sm:pb-24 lg:pb-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-neutral-300 bg-white/70 backdrop-blur text-xs text-neutral-700">
                  Enterprise AI, made accountable
                </span>
                <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
                  Building{" "}
                  <Typewriter words={["accountable", "reliable", "safe"]} />{" "}
                  <br /> AI for Enterprise
                </h1>
                <p className="mt-6 text-neutral-700 text-base sm:text-lg max-w-2xl">
                  Deploy agents and workflows with built-in{" "}
                  <span className="underline-animate auto">safety</span> and{" "}
                  <span className="underline-animate auto">governance</span>.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-md bg-primary text-white px-5 py-3 font-medium hover:bg-primary/90 transition-colors"
                  >
                    Get in touch
                    <ChevronRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#focus"
                    className="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-5 py-3 hover:bg-neutral-100 transition-colors text-neutral-900"
                  >
                    See how it works
                  </a>
                </div>
              </motion.div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="relative aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(141,191,182,0.20),_transparent_60%)]" />
                  <div className="relative z-10 h-full w-full p-8 flex items-center justify-center">
                    <Brain
                      className="h-40 w-40 sm:h-52 sm:w-52 md:h-64 md:w-64"
                      color="#8EBFB6"
                      strokeWidth={1.6}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Business Value Intro */}
        <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-neutral-900">
              Trust-ready AI. Your stack. Your controls.
            </h1>
          </motion.div>

          <BentoGrid className="mt-10 md:auto-rows-[18rem]">
            <BentoCard
              name="Security & Compliance"
              className="md:col-span-1"
              background={
                <div className="absolute inset-0 bg-[url('/rocky-cliff.jpeg')] bg-cover bg-center" />
              }
              Icon={ShieldCheck}
              description="Protect data with layered controls, fine-grained permissions, and certifications that meet enterprise standards."
              href="#"
              cta="Learn more"
            />
            <BentoCard
              name="Flexible Deployment"
              className="md:col-span-2"
              background={
                <div className="absolute inset-0 bg-[url('/tree-tops.jpg')] bg-cover bg-center" />
              }
              Icon={Workflow}
              description="Run in a dedicated VPC or on-premises. Keep traffic private and models close to your data."
              href="#"
              cta="Learn more"
            />
            <BentoCard
              name="Fully Integrated"
              className="md:col-span-3 lg:col-span-2"
              background={
                <div className="absolute inset-0 bg-[url('/green-forest.jpg')] bg-cover bg-center" />
              }
              Icon={MessageSquare}
              description="Adapt models to your terminology and workflows so teams get accurate, on-brand results."
              href="#"
              cta="Learn more"
            />
            <BentoCard
              name="Customer Visuals"
              className="md:col-span-1"
              background={
                <div className="absolute inset-0 bg-[url('/sunrise.jpg')] bg-cover bg-center" />
              }
              Icon={ImageIcon}
              description="Showcase outcomes with brand imagery, dashboards, and artifacts that matter to your stakeholders."
              href="#"
              cta="Explore gallery"
            />
          </BentoGrid>
        </section>

        {/* Capabilities */}
        <section id="focus" className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <MessageSquare className="h-6 w-6 text-primary" />,
                title: "Conversational AI, Built for Business",
                points: [
                  "Secure, enterprise-ready chatbots",
                  "Seamless integration with internal and customer platforms",
                  "Continuous monitoring and escalation tools",
                ],
              },
              {
                icon: <Workflow className="h-6 w-6 text-primary" />,
                title: "Automated Workflows with Oversight",
                points: [
                  "Smart process automation that respects compliance",
                  "Transparent reporting and explainable outputs",
                  "Real-time dashboards for IT and compliance",
                ],
              },
              {
                icon: <ShieldCheck className="h-6 w-6 text-primary" />,
                title: "Governance & Accountability by Design",
                points: [
                  "Embedded safeguards to detect bias and errors",
                  "Audit-friendly logging and monitoring",
                  "Configurable guardrails for your industry",
                ],
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-6"
              >
                <div className="h-10 w-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                  {card.icon}
                </div>
                <div className="mt-3 font-semibold text-neutral-900">
                  {card.title}
                </div>
                <ul className="mt-3 space-y-2 text-neutral-700">
                  {card.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="mt-0.5 h-4 w-4 text-neutral-400" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why We Fit */}
        <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Trust by default",
                body: "Safety, auditability, and controls are built into every engagement.",
              },
              {
                title: "Built for the enterprise",
                body: "We ship with SSO, RBAC, SLAs, and integrations your teams expect.",
              },
              {
                title: "Ready to scale",
                body: "Start fast and expand confidently without compromising governance.",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="rounded-xl border border-neutral-200 bg-white p-6"
              >
                <h3 className="font-semibold mb-2 text-neutral-900">
                  {card.title}
                </h3>
                <p className="text-neutral-700">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How We Work */}
        <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              "Discover & align",
              "Design & build",
              "Deploy & integrate",
              "Measure & evolve",
            ].map((step, idx) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="rounded-xl border border-neutral-200 p-6 bg-white"
              >
                <div className="text-4xl font-bold text-neutral-300">
                  {idx + 1}
                </div>
                <h4 className="mt-2 font-semibold text-neutral-900">{step}</h4>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Who We Serve */}
        <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Financial services",
              "Public sector",
              "Healthcare",
              "Enterprise IT",
            ].map((sector) => (
              <motion.div
                key={sector}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl border border-neutral-200 p-6 bg-white"
              >
                <h4 className="font-semibold text-neutral-900">{sector}</h4>
                <p className="mt-2 text-neutral-700">
                  Accountable AI for regulated, complex environments.
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA / Contact */}
        <section id="contact" className="mx-auto max-w-7xl px-6 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">
              Let’s Build Accountable AI Together
            </h2>
            <p className="mt-3 text-neutral-700 max-w-2xl mx-auto">
              The future of enterprise AI isn’t just smart — it’s trustworthy,
              explainable, and safe. That’s what we deliver.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:contact@deepcurrent.ai"
                className="inline-flex items-center gap-2 rounded-md bg-primary text-white px-5 py-3 font-medium hover:bg-primary/90 transition-colors"
              >
                Email Us
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-5 py-3 hover:bg-neutral-100 transition-colors text-neutral-900"
              >
                Book a Demo
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
          <div>© {new Date().getFullYear()} DeepCurrent</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-neutral-900">
              Privacy
            </a>
            <a href="#" className="hover:text-neutral-900">
              Security
            </a>
            <a href="#" className="hover:text-neutral-900">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
