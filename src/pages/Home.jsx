import ExerciseMedia from "../components/ExerciseMedia";
import ExerciseStatus from "../components/ExerciseStatus";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFitness } from "../contexts/FitnessContext";
import { useExercises } from "../contexts/ExerciseDataContext";
import { templates, todayKey } from "../data/training";
import AppShell from "../components/layout/AppShell";
import Icon from "../components/ui/Icon";
import Modal from "../components/ui/Modal";
export default function Home() {
  const { exercises, status: exerciseStatus } = useExercises();
  const { workout, setWorkout, history, favorites, meals } = useFitness();
  const navigate = useNavigate();
  const [pending, setPending] = useState(null);
  const date = new Date();
  const days = Array.from({ length: 7 }, (_, index) => {
    const day = new Date();
    day.setDate(
      day.getDate() - day.getDay() + (day.getDay() === 0 ? -6 : 1) + index,
    );
    return day;
  });
  const todaysMeals = meals.filter((meal) => meal.date === todayKey());
  const calories = Math.round(
    todaysMeals.reduce((sum, meal) => sum + meal.calories, 0),
  );
  const applyTemplate = (template) => {
    setWorkout({
      name: template.name,
      exercises: template.exercises
        .filter((id) => exercises.some((exercise) => exercise.id === id))
        .map((id) => ({
          id,
          sets: 3,
          reps: 10,
          weight: 0,
        })),
    });
    setPending(null);
    navigate("/workout");
  };
  const loadTemplate = (template) =>
    workout.exercises.length ? setPending(template) : applyTemplate(template);
  return (
    <AppShell
      home
      title="A little stronger, every day."
      subtitle={
        date.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }) + " · Make time for yourself."
      }
      headerActions={
        <Link className="button primary" to="/workout">
          <Icon name="plus" size={16} />
          Build a workout
        </Link>
      }
    >
      <ExerciseStatus />
      <div className="overview-stats">
        <div>
          <span>Completed sessions</span>
          <strong>
            {history.length}
            <small> workouts</small>
          </strong>
        </div>
        <div>
          <span>In your workout</span>
          <strong>
            {workout.exercises.length}
            <small> exercises</small>
          </strong>
        </div>
        <div>
          <span>Saved movements</span>
          <strong>
            {favorites.length}
            <small> favorites</small>
          </strong>
        </div>
        <div>
          <span>Food logged today</span>
          <strong>
            {calories.toLocaleString()}
            <small> kcal</small>
          </strong>
        </div>
      </div>
      <div className="home-grid">
        <section className="panel training-panel">
          <div className="section-heading">
            <h2>Your next session</h2>
            <Link to="/workout" className="text-link">
              Open workout <Icon name="arrowUpRight" size={16} />
            </Link>
          </div>
          <div className="session-feature">
            <div>
              <span className="subtle-tag">
                <span className="status-dot" />
                At your own pace
              </span>
              <h3>
                {workout.exercises.length
                  ? workout.name
                  : "Start with the basics."}
              </h3>
              <p>
                {workout.exercises.length
                  ? `${workout.exercises.length} movements, ready when you are. Pick up where you left off.`
                  : "Build a little strength. Find your rhythm. Your next good habit starts with one session."}
              </p>
              <Link to="/workout" className="button primary">
                {workout.exercises.length
                  ? "Continue workout"
                  : "Plan your session"}
                <Icon name="arrowRight" size={16} />
              </Link>
            </div>
            <div className="session-art" aria-hidden="true">
              <ExerciseMedia
                exercise={exercises.find((item) => item.id === "0289")}
                controls={false}
                decorative
              />
              <div className="session-art-caption">
                <span>Strength starts here</span>
              </div>
            </div>
          </div>
          <div className="session-bottom">
            <span>
              <Icon name="clock" size={15} />
              Make 20 minutes count
            </span>
            <Link to="/searchexercises">
              Explore {exerciseStatus === "ready" ? exercises.length : ""}{" "}
              movements <Icon name="arrowRight" size={14} />
            </Link>
          </div>
        </section>
        <section className="panel week-panel">
          <div className="section-heading">
            <h2>This week, your pace.</h2>
            <Icon name="activity" size={17} />
          </div>
          <p className="muted">Every session is a step forward.</p>
          <div className="week-days">
            {days.map((day) => {
              const key = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
              const completed = history.some((item) => item.date === key);
              return (
                <div
                  key={key}
                  className={`week-day ${key === todayKey() ? "today" : ""} ${completed ? "completed" : ""}`}
                >
                  <span>
                    {day.toLocaleDateString("en", { weekday: "narrow" })}
                  </span>
                  <span className="day-date">
                    {completed ? (
                      <Icon name="check" size={14} />
                    ) : (
                      day.getDate()
                    )}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="week-summary">
            <strong>
              {
                history.filter(
                  (item) =>
                    item.date >= todayKey(days[0]) &&
                    item.date <= todayKey(days[6]),
                ).length
              }
              <small> sessions this week</small>
            </strong>
            <p>Your rhythm is yours to build.</p>
          </div>
          <Link to="/workout" className="text-link">
            Make time to move <Icon name="arrowRight" size={15} />
          </Link>
        </section>
        <section className="routines-section">
          <div className="section-heading">
            <div>
              <h2>A starting point, picked for you</h2>
              <p className="muted">Simple sessions you can make your own.</p>
            </div>
            <Link to="/searchexercises" className="text-link">
              Exercise library <Icon name="arrowUpRight" size={16} />
            </Link>
          </div>
          <div className="routine-grid">
            {templates.map((template, index) => (
              <button
                className={`routine-card routine-${index}`}
                key={template.id}
                onClick={() => loadTemplate(template)}
              >
                <div className="routine-art">
                  <ExerciseMedia
                    exercise={exercises.find(
                      (exercise) => exercise.id === template.exercises[index],
                    )}
                    controls={false}
                    decorative
                  />
                  <span className="routine-time">
                    <Icon name="clock" size={14} />
                    {template.minutes} min
                  </span>
                </div>
                <div className="routine-content">
                  <span className="small-label">
                    {template.equipment} · {template.exercises.length} movements
                  </span>
                  <h3>{template.name}</h3>
                  <span className="muted">{template.detail}</span>
                  <span className="routine-arrow">
                    <Icon name="arrowUpRight" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
        <section className="panel everyday-panel">
          <div className="section-heading">
            <h2>Look after the rest of you.</h2>
            <span className="muted">Beyond the workout</span>
          </div>
          <div className="everyday-links">
            {[
              {
                icon: "coffee",
                title: "Know what fuels you",
                copy: "Explore food and log a little nourishment.",
                path: "/nutrition",
              },
              {
                icon: "book",
                title: "Something good to cook",
                copy: "Fresh inspiration for your next meal.",
                path: "/recipes",
              },
              {
                icon: "sun",
                title: "Take your movement outside",
                copy: "Check the weather before you head out.",
                path: "/outdoors",
              },
            ].map((item) => (
              <Link to={item.path} key={item.path}>
                <Icon name={item.icon} size={21} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
                <Icon name="arrowUpRight" size={17} />
              </Link>
            ))}
          </div>
        </section>
      </div>
      {pending && (
        <Modal
          title="Use this starting routine?"
          onClose={() => setPending(null)}
        >
          <p>
            This replaces your current workout with “{pending.name}”. Your saved
            session history stays here.
          </p>
          <div className="button-row">
            <button
              className="button secondary"
              onClick={() => setPending(null)}
            >
              Keep my workout
            </button>
            <button
              className="button primary"
              onClick={() => applyTemplate(pending)}
            >
              Use this routine
            </button>
          </div>
        </Modal>
      )}
    </AppShell>
  );
}
