import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import Button from "../components/ui/Button";
import Signup from "../components/Signup";
import { BodyText, DisplayTitle, Eyebrow, Lead, SectionTitle } from "../components/system/Typography";

const features = [
  {
    title: "Exercise library",
    summary: "Search by muscle groups and jump directly into instructions and equipment details.",
  },
  {
    title: "Readiness checks",
    summary: "Use the BMI panel to monitor baseline health and keep your plan grounded.",
  },
  {
    title: "Session timing",
    summary: "Attach a focused timer to every movement so sets stay consistent and measurable.",
  },
];

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AppShell title="Training command center" subtitle="Fit Pool workspace">
        <section className="surface section-space grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <Eyebrow>Move with structure</Eyebrow>
            <DisplayTitle className="mt-4">
              Train smarter with a focused fitness workspace.
            </DisplayTitle>
            <Lead className="mt-5">
              Fit Pool brings workouts, progress metrics, and session tools into one clean experience designed
              for consistency.
            </Lead>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => setIsModalOpen(true)}>
                Get started
              </Button>
              <Link to="/bmicalculator">
                <Button variant="secondary" size="lg">
                  Open BMI calculator
                </Button>
              </Link>
            </div>

            <div className="metric-list mt-10">
              <div className="metric-item">
                <p className="metric-label">Exercise records</p>
                <p className="metric-value">500+</p>
              </div>
              <div className="metric-item">
                <p className="metric-label">Body part filters</p>
                <p className="metric-value">10</p>
              </div>
              <div className="metric-item">
                <p className="metric-label">Flow</p>
                <p className="metric-value">Search to train</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-2xl border border-[var(--line-color)] bg-[var(--bg-soft)]"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <img
              src="/images/assets/home1.png"
              alt="Athletes training together"
              className="h-full max-h-[420px] w-full object-cover object-top"
            />
          </motion.div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <article className="surface section-space">
            <SectionTitle>Built around real workout routines</SectionTitle>
            <BodyText className="mt-3">
              Every section is designed to reduce friction: find exercises fast, review the motion, and run your
              timer without leaving the page.
            </BodyText>

            <div className="mt-8 grid gap-5">
              {features.map((feature) => (
                <div key={feature.title}>
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <BodyText className="mt-1">{feature.summary}</BodyText>
                </div>
              ))}
            </div>
          </article>

          <article className="surface section-space">
            <SectionTitle>Start in under a minute</SectionTitle>
            <BodyText className="mt-3">
              Create your account, pick a body part, and begin training with a clear set-by-set flow.
            </BodyText>

            <div className="mt-7 space-y-5">
              <div>
                <p className="text-sm font-semibold">1. Sign in to unlock exercises</p>
                <p className="muted-line text-sm">Authentication protects workout browsing and exercise details.</p>
              </div>
              <div>
                <p className="text-sm font-semibold">2. Choose a target area</p>
                <p className="muted-line text-sm">Body-part filtering keeps recommendations relevant.</p>
              </div>
              <div>
                <p className="text-sm font-semibold">3. Run your workout timer</p>
                <p className="muted-line text-sm">Set your session length and train with consistent pace.</p>
              </div>
            </div>
          </article>
        </section>
      </AppShell>

      {isModalOpen && <Signup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Home;
