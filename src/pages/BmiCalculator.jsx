import { useMemo, useState } from "react";
import AppShell from "../components/layout/AppShell";
import Button from "../components/ui/Button";
import { BodyText, SectionTitle } from "../components/system/Typography";

const bmiRows = [
  ["Severe thinness", "Less than 16"],
  ["Moderate thinness", "16 - 17"],
  ["Mild thinness", "17 - 18.5"],
  ["Normal weight", "18.5 - 24.9"],
  ["Overweight", "25 - 29.9"],
  ["Obesity class I", "30 - 34.9"],
  ["Obesity class II", "35 - 39.9"],
  ["Obesity class III", "40+"],
];

const BmiCalculator = () => {
  const [weight, setWeight] = useState(65);
  const [feet, setFeet] = useState(5);
  const [inch, setInch] = useState(7);
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");

  const heightInMeters = useMemo(() => ((feet * 12 + inch) * 0.0254).toFixed(2), [feet, inch]);

  const calculateBmi = () => {
    const meters = (feet * 12 + inch) * 0.0254;
    const bmiValue = weight / (meters * meters);
    setBmi(bmiValue.toFixed(2));

    const minHealthyWeight = 18.5 * meters * meters;
    const maxHealthyWeight = 24.9 * meters * meters;

    if (bmiValue < 18.5) {
      setMessage(`Underweight range. Add about ${(minHealthyWeight - weight).toFixed(1)} kg to enter the healthy zone.`);
      return;
    }

    if (bmiValue <= 24.9) {
      setMessage("Healthy range. Keep your current routine steady.");
      return;
    }

    setMessage(`Above healthy range. Reduce about ${(weight - maxHealthyWeight).toFixed(1)} kg to return to the healthy zone.`);
  };

  return (
    <AppShell title="BMI Calculator" subtitle="Health baseline">
      <section className="grid gap-4 xl:grid-cols-[minmax(0,420px)_1fr]">
        <article className="surface section-space">
          <SectionTitle>Calculate your BMI</SectionTitle>
          <BodyText className="mt-2">Adjust your current values and compute instantly.</BodyText>

          <div className="mt-7 space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Weight</span>
                <span>{weight} kg</span>
              </div>
              <input
                type="range"
                min={30}
                max={140}
                step={1}
                value={weight}
                onChange={(event) => setWeight(Number(event.target.value))}
                className="w-full accent-[var(--accent-500)]"
              />
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Height (feet)</span>
                <span>{feet} ft</span>
              </div>
              <input
                type="range"
                min={3}
                max={7}
                step={1}
                value={feet}
                onChange={(event) => setFeet(Number(event.target.value))}
                className="w-full accent-[var(--accent-500)]"
              />
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Height (inches)</span>
                <span>{inch} in</span>
              </div>
              <input
                type="range"
                min={0}
                max={11}
                step={1}
                value={inch}
                onChange={(event) => setInch(Number(event.target.value))}
                className="w-full accent-[var(--accent-500)]"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={calculateBmi}>Calculate</Button>
            <Button variant="secondary" onClick={() => setBmi("")}>
              Reset result
            </Button>
          </div>

          <div className="mt-6 rounded-xl border border-[var(--line-color)] bg-[var(--bg-soft)] p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Your result</p>
            <p className="mt-2 text-4xl font-bold tracking-[-0.03em]">{bmi || "--"}</p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{message || "BMI insight appears here after calculation."}</p>
            <p className="mt-2 text-xs text-[var(--text-muted)]">Current height: {heightInMeters} m</p>
          </div>
        </article>

        <article className="surface section-space">
          <SectionTitle>BMI Reference</SectionTitle>
          <BodyText className="mt-2">
            BMI is a screening metric that combines height and weight. It does not directly measure body fat, but it
            is a useful first checkpoint.
          </BodyText>

          <img
            src="/images/bmireference.png"
            alt="Body mass index reference chart"
            className="mt-6 w-full rounded-2xl border border-[var(--line-color)] object-cover"
          />

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--line-color)] text-sm text-[var(--text-muted)]">
                  <th className="pb-3 font-medium">Classification</th>
                  <th className="pb-3 font-medium">BMI range (kg/m²)</th>
                </tr>
              </thead>
              <tbody>
                {bmiRows.map(([label, range]) => (
                  <tr key={label} className="border-b border-[var(--line-color)]">
                    <td className="py-3 text-sm">{label}</td>
                    <td className="py-3 text-sm text-[var(--text-muted)]">{range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </AppShell>
  );
};

export default BmiCalculator;
