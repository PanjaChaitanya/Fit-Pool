import ExerciseMedia from "../components/ExerciseMedia";
import ExerciseStatus from "../components/ExerciseStatus";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useExercises } from "../contexts/ExerciseDataContext";
import { templates, todayKey, equipmentName } from "../data/training";
import { useFitness } from "../contexts/FitnessContext";
import AppShell from "../components/layout/AppShell";
import Icon from "../components/ui/Icon";
import Modal from "../components/ui/Modal";
const formatTime = (seconds) =>
  `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
export default function Workout() {
  const { exercises } = useExercises();
  const { workout, setWorkout, history, setHistory, notify } = useFitness();
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState([]);
  const [rest, setRest] = useState(0);
  const [confirm, setConfirm] = useState(null);
  const start = useRef(0);
  const accumulated = useRef(0);
  const restEnd = useRef(0);
  useEffect(() => {
    if (!running && !rest) return;
    const interval = setInterval(() => {
      if (running)
        setElapsed(
          accumulated.current + Math.floor((Date.now() - start.current) / 1000),
        );
      if (restEnd.current) {
        const left = Math.max(
          0,
          Math.ceil((restEnd.current - Date.now()) / 1000),
        );
        setRest(left);
        if (!left) {
          restEnd.current = 0;
          notify("Rest complete. Ready for your next set.");
        }
      }
    }, 250);
    return () => clearInterval(interval);
  }, [running, rest, notify]);
  const toggleTimer = () => {
    if (running) {
      accumulated.current += Math.floor((Date.now() - start.current) / 1000);
      setElapsed(accumulated.current);
    } else start.current = Date.now();
    setRunning(!running);
  };
  const resetTimer = () => {
    setRunning(false);
    setElapsed(0);
    accumulated.current = 0;
    setRest(0);
    restEnd.current = 0;
  };
  const update = (id, key, value) =>
    setWorkout((previous) => ({
      ...previous,
      exercises: previous.exercises.map((item) =>
        item.id === id
          ? {
              ...item,
              [key]: Math.max(
                key === "weight" ? 0 : 1,
                Math.min(
                  key === "sets" ? 20 : key === "reps" ? 200 : 1000,
                  Number(value) || 0,
                ),
              ),
            }
          : item,
      ),
    }));
  const loadTemplate = (template) => {
    setWorkout({
      name: template.name,
      exercises: template.exercises
        .filter((id) => exercises.some((item) => item.id === id))
        .map((id) => ({
          id,
          sets: 3,
          reps: 10,
          weight: 0,
        })),
    });
    setDone([]);
    resetTimer();
    setConfirm(null);
    notify("Routine ready. Make it your own.");
  };
  const finish = () => {
    const complete = workout.exercises.filter((item) => done.includes(item.id));
    setHistory((previous) =>
      [
        {
          id: crypto.randomUUID(),
          name: workout.name,
          date: todayKey(),
          seconds: elapsed,
          exercises: complete,
          sets: complete.reduce((sum, item) => sum + item.sets, 0),
        },
        ...previous,
      ].slice(0, 365),
    );
    resetTimer();
    setDone([]);
    notify("Session saved. A little stronger than yesterday.");
  };
  const exportWorkout = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            name: workout.name,
            exercises: workout.exercises.map((item) => ({
              ...item,
              name: exercises.find((exercise) => exercise.id === item.id)?.name,
            })),
          },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fitpool-workout.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <AppShell
      title="Make this session yours."
      subtitle="Your movements, your pace. A plan you can come back to."
      headerActions={
        <Link to="/searchexercises" className="button primary">
          <Icon name="plus" size={16} />
          Add movements
        </Link>
      }
    >
      <ExerciseStatus />
      <div className="workout-grid">
        <section className="panel workout-builder">
          <div className="workout-heading">
            <label>
              <span className="small-label">Workout name</span>
              <input
                className="workout-name"
                aria-label="Workout name"
                maxLength={60}
                value={workout.name}
                onChange={(event) =>
                  setWorkout((previous) => ({
                    ...previous,
                    name: event.target.value,
                  }))
                }
              />
            </label>
            <button
              className="icon-button"
              onClick={exportWorkout}
              disabled={!workout.exercises.length}
              aria-label="Download workout"
            >
              <Icon name="download" />
            </button>
          </div>
          <div className="workout-summary">
            <span>{workout.exercises.length} movements</span>
            <span>
              {workout.exercises.reduce((sum, item) => sum + item.sets, 0)}{" "}
              planned sets
            </span>
            <span>
              {
                done.filter((id) =>
                  workout.exercises.some((item) => item.id === id),
                ).length
              }{" "}
              completed
            </span>
          </div>
          {!workout.exercises.length ? (
            <div className="empty-state">
              <Icon name="target" size={32} />
              <h2>Your next session starts here.</h2>
              <p>
                Add movements from the library, or pick a starting routine
                below.
              </p>
              <Link className="button secondary" to="/searchexercises">
                Find a movement <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          ) : (
            <div className="workout-list">
              {workout.exercises.map((item) => {
                const exercise = exercises.find(
                  (value) => value.id === item.id,
                );
                if (!exercise) return null;
                return (
                  <article
                    className={`workout-row ${done.includes(item.id) ? "done" : ""}`}
                    key={item.id}
                  >
                    <div className="workout-movement">
                      <ExerciseMedia
                        exercise={exercise}
                        controls={false}
                        decorative
                      />
                      <div>
                        <Link to={`/exercise/${item.id}`}>{exercise.name}</Link>
                        <span className="muted capitalize">
                          {equipmentName(exercise.equipment)}
                        </span>
                      </div>
                      <button
                        className="icon-button"
                        aria-label={`Remove ${exercise.name}`}
                        onClick={() => {
                          setWorkout((previous) => ({
                            ...previous,
                            exercises: previous.exercises.filter(
                              (value) => value.id !== item.id,
                            ),
                          }));
                          setDone((previous) =>
                            previous.filter((value) => value !== item.id),
                          );
                        }}
                      >
                        <Icon name="x" size={16} />
                      </button>
                    </div>
                    <div className="workout-controls">
                      {[
                        ["sets", "Sets"],
                        ["reps", "Reps"],
                        ["weight", "Weight · kg"],
                      ].map(([key, label]) => (
                        <label key={key}>
                          <span>{label}</span>
                          <input
                            type="number"
                            inputMode={key === "weight" ? "decimal" : "numeric"}
                            min={key === "weight" ? 0 : 1}
                            max={
                              key === "sets" ? 20 : key === "reps" ? 200 : 1000
                            }
                            step={key === "weight" ? 0.5 : 1}
                            value={item[key]}
                            aria-label={`${exercise.name} ${label}`}
                            onChange={(event) =>
                              update(item.id, key, event.target.value)
                            }
                          />
                        </label>
                      ))}
                      <button
                        className={`complete-movement ${done.includes(item.id) ? "checked" : ""}`}
                        aria-label={`Mark ${exercise.name} ${done.includes(item.id) ? "incomplete" : "complete"}`}
                        aria-pressed={done.includes(item.id)}
                        onClick={() =>
                          setDone((previous) =>
                            previous.includes(item.id)
                              ? previous.filter((value) => value !== item.id)
                              : [...previous, item.id],
                          )
                        }
                      >
                        <Icon name="check" size={18} />
                        <span>
                          {done.includes(item.id) ? "Done" : "Complete"}
                        </span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
        <aside className="workout-rail">
          <section className="panel timer-panel">
            <div className="section-heading">
              <h2>One set at a time.</h2>
              <Icon name="clock" />
            </div>
            <p className="muted">Your session timer</p>
            <div
              className="timer-display"
              role="timer"
              aria-label={`Elapsed time ${formatTime(elapsed)}`}
            >
              {formatTime(elapsed)}
            </div>
            <div className="timer-actions">
              <button
                className="button primary"
                onClick={toggleTimer}
                aria-label={running ? "Pause timer" : "Start timer"}
              >
                <Icon name={running ? "pause" : "play"} size={16} />
                {running ? "Pause" : "Start session"}
              </button>
              <button
                className="icon-button"
                onClick={resetTimer}
                aria-label="Reset timer"
              >
                <Icon name="refresh" size={17} />
              </button>
            </div>
            <div className="rest-control">
              <div className="section-heading">
                <span>Between sets</span>
                <strong>{rest ? formatTime(rest) : "Take a breath."}</strong>
              </div>
              <div className="rest-presets">
                {[30, 60, 90].map((seconds) => (
                  <button
                    key={seconds}
                    onClick={() => {
                      restEnd.current = Date.now() + seconds * 1000;
                      setRest(seconds);
                    }}
                  >
                    {seconds}s rest
                  </button>
                ))}
              </div>
            </div>
            <button
              className="button secondary finish-button"
              onClick={finish}
              disabled={
                !done.some((id) =>
                  workout.exercises.some((item) => item.id === id),
                )
              }
            >
              <Icon name="checkCircle" size={16} />
              Finish & save session
            </button>
            <p className="small-label">
              Mark a movement complete to save your session.
            </p>
          </section>
          <section className="local-note">
            <Icon name="shield" size={18} />
            <div>
              <strong>Just for you, on this device.</strong>
              <p>
                Your workout is saved in this browser. Download a copy to keep
                it elsewhere.
              </p>
            </div>
          </section>
        </aside>
      </div>
      <section className="template-section">
        <div className="section-heading">
          <h2>Need a starting point?</h2>
          <span className="muted">Ready-made, easily adjusted.</span>
        </div>
        <div className="template-grid">
          {templates.map((template) => (
            <button
              className="template-card"
              key={template.id}
              onClick={() =>
                workout.exercises.length
                  ? setConfirm(template)
                  : loadTemplate(template)
              }
            >
              <Icon name="activity" />
              <h3>{template.name}</h3>
              <p>
                {template.exercises.length} movements · About {template.minutes}{" "}
                min
              </p>
              <Icon name="arrowUpRight" size={17} />
            </button>
          ))}
        </div>
      </section>
      {history.length > 0 && (
        <section className="panel history-panel">
          <div className="section-heading">
            <h2>A little progress, remembered.</h2>
            <span className="muted">Recent sessions</span>
          </div>
          {history.slice(0, 5).map((item) => (
            <div className="history-row" key={item.id}>
              <Icon name="checkCircle" />
              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.date} · {item.exercises.length} movements · {item.sets}{" "}
                  sets
                </span>
              </div>
              <span>{formatTime(item.seconds)}</span>
            </div>
          ))}
        </section>
      )}
      {confirm && (
        <Modal
          title="Start a different routine?"
          onClose={() => setConfirm(null)}
        >
          <p>
            This replaces your current workout with “{confirm.name}” and resets
            the session timer. Completed sessions stay in your history.
          </p>
          <div className="button-row">
            <button
              className="button secondary"
              onClick={() => setConfirm(null)}
            >
              Keep my workout
            </button>
            <button
              className="button primary"
              onClick={() => loadTemplate(confirm)}
            >
              Use this routine
            </button>
          </div>
        </Modal>
      )}
    </AppShell>
  );
}
