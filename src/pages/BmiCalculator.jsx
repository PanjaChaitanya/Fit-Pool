import { useState } from "react";
import AppShell from "../components/layout/AppShell";
import Icon from "../components/ui/Icon";
import { useLocalState } from "../utilities/storage";
export default function BmiCalculator() {
  const [metrics, setMetrics] = useLocalState("metrics", {
    height: 170,
    weight: 65,
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const calculate = (event) => {
    event.preventDefault();
    const height = Number(metrics.height);
    const weight = Number(metrics.weight);
    if (height < 100 || height > 250 || weight < 25 || weight > 400) {
      setError("Enter a height from 100–250 cm and a weight from 25–400 kg.");
      return;
    }
    setError("");
    setResult((weight / (height / 100) ** 2).toFixed(1));
  };
  return (
    <AppShell
      title="A baseline. A bigger picture."
      subtitle="One small measure to help you understand your starting point."
    >
      <div className="metrics-grid">
        <section className="panel metrics-form">
          <div className="section-heading">
            <h2>Your body mass index</h2>
            <Icon name="activity" />
          </div>
          <p className="muted">A simple ratio of your height and weight.</p>
          <form onSubmit={calculate}>
            <label>
              Height
              <span className="input-with-unit">
                <input
                  aria-label="Height in centimeters"
                  type="number"
                  min="100"
                  max="250"
                  step="0.1"
                  value={metrics.height}
                  onChange={(event) =>
                    setMetrics((previous) => ({
                      ...previous,
                      height: event.target.value,
                    }))
                  }
                  required
                />
                <span>cm</span>
              </span>
            </label>
            <label>
              Weight
              <span className="input-with-unit">
                <input
                  aria-label="Weight in kilograms"
                  type="number"
                  min="25"
                  max="400"
                  step="0.1"
                  value={metrics.weight}
                  onChange={(event) =>
                    setMetrics((previous) => ({
                      ...previous,
                      weight: event.target.value,
                    }))
                  }
                  required
                />
                <span>kg</span>
              </span>
            </label>
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}
            <button className="button primary full-width">
              Calculate BMI <Icon name="arrowRight" size={16} />
            </button>
          </form>
          <p className="small-label">
            <Icon name="shield" size={14} />
            Your measurements stay in this browser.
          </p>
        </section>
        <section className="panel metrics-result" aria-live="polite">
          <span className="small-label">Your result</span>
          <div className="bmi-number">
            {result || "—"}
            <small>kg/m²</small>
          </div>
          <h2>
            {result
              ? "One number, part of your story."
              : "Start where you are."}
          </h2>
          <p>
            {result
              ? "BMI is a screening measure. It does not distinguish muscle from fat or describe your overall fitness."
              : "Enter your measurements to calculate your BMI. Your progress is more than a single number."}
          </p>
          <div className="metrics-formula">
            <span>How it’s calculated</span>
            <strong>Weight (kg) ÷ height² (m)</strong>
          </div>
        </section>
      </div>
      <section className="panel metrics-perspective">
        <div>
          <Icon name="info" size={23} />
          <h2>Keep the whole picture in mind.</h2>
        </div>
        <div>
          <p>
            BMI is one screening tool for adults. Age, muscle mass, body
            composition, and individual circumstances can change how useful it
            is.
          </p>
          <p>
            Use it alongside how you feel, your strength, your habits, and
            advice from a qualified health professional. This calculator does
            not set weight-loss or calorie targets.
          </p>
          <a
            className="text-link"
            href="https://www.cdc.gov/bmi/adult-calculator/index.html"
            target="_blank"
            rel="noreferrer"
          >
            Learn about adult BMI <Icon name="external" size={14} />
          </a>
        </div>
      </section>
    </AppShell>
  );
}
