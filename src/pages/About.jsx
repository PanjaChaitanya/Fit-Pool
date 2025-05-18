import AppShell from "../components/layout/AppShell";
import { BodyText, SectionTitle } from "../components/system/Typography";

const stack = [
  "React + Vite",
  "Tailwind CSS",
  "Framer Motion",
  "Firebase Authentication",
  "ExerciseDB API",
];

const principles = [
  "Design for speed before decoration.",
  "Keep interactions clear on both desktop and mobile.",
  "Use consistent spacing and typography as the primary visual hierarchy.",
];

const About = () => {
  return (
    <AppShell title="About Fit Pool" subtitle="Product notes">
      <section className="surface section-space grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <img
          src="/images/assets/chaitanya.png"
          alt="Developer portrait"
          className="aspect-square w-44 rounded-2xl object-cover ring-1 ring-[var(--line-color)] lg:w-56"
        />

        <div>
          <SectionTitle>Built to make training sessions less chaotic</SectionTitle>
          <BodyText className="mt-4">
            Fit Pool was crafted by Chaitanya Panja as a practical fitness product: searchable workouts, baseline
            health checks, and focused workout timing in one place.
          </BodyText>
          <BodyText className="mt-2">
            The goal is not visual noise. The goal is clear decisions while you train.
          </BodyText>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                Core stack
              </h3>
              <ul className="mt-3 space-y-2">
                {stack.map((item) => (
                  <li key={item} className="text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                Design principles
              </h3>
              <ul className="mt-3 space-y-2">
                {principles.map((item) => (
                  <li key={item} className="text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
};

export default About;
