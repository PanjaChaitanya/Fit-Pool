import { useRef, useState } from "react";
import Icon from "./ui/Icon";
import { useExercises } from "../contexts/ExerciseDataContext";
export default function ExerciseMedia({
  exercise,
  controls = true,
  className = "",
  decorative = false,
}) {
  const image = useRef(null);
  const { status, reload } = useExercises();
  const canvas = useRef(null);
  const [playing, setPlaying] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [imageState, setImageState] = useState({ url: "", status: "loading" });
  const [attempt, setAttempt] = useState(0);
  const capture = () => {
    if (!image.current?.naturalWidth || !canvas.current) return;
    canvas.current.width = image.current.naturalWidth;
    canvas.current.height = image.current.naturalHeight;
    canvas.current.getContext("2d").drawImage(image.current, 0, 0);
  };
  const toggle = () => {
    if (playing) capture();
    setPlaying(!playing);
  };
  const url = exercise?.gifUrl;
  const loaded = imageState.url === url && imageState.status === "ready";
  const failed = imageState.url === url && imageState.status === "error";
  return (
    <div
      className={`exercise-media ${className}`}
      data-playing={playing}
      role={decorative ? undefined : "group"}
      aria-label={
        decorative
          ? undefined
          : `${exercise?.name || "Exercise"} animated muscle guide`
      }
    >
      {url && !failed ? (
        <>
          <img
            key={`${url}-${attempt}`}
            ref={image}
            src={url}
            alt={
              decorative
                ? ""
                : `${exercise.name}: animated demonstration with target muscles highlighted in red`
            }
            loading="lazy"
            onLoad={() => {
              setImageState({ url, status: "ready" });
              if (!playing) capture();
            }}
            onError={() => setImageState({ url, status: "error" })}
            style={{ visibility: playing ? "visible" : "hidden" }}
          />
          <canvas
            ref={canvas}
            className="paused-frame"
            style={{ display: playing ? "none" : "block" }}
            aria-hidden="true"
          />
          {!loaded && (
            <div
              className="animation-loading"
              aria-hidden={decorative ? "true" : undefined}
            >
              {decorative ? (
                <Icon name="activity" size={18} />
              ) : (
                "Loading animation…"
              )}
            </div>
          )}
          {controls && loaded && (
            <button
              className="animation-toggle"
              onClick={toggle}
              aria-label={`${playing ? "Pause" : "Play"} ${exercise.name} animation`}
              aria-pressed={playing}
            >
              <Icon name={playing ? "pause" : "play"} size={13} />
              {playing ? "Pause" : "Play"}
            </button>
          )}
        </>
      ) : (
        <div
          className="animation-placeholder"
          role={decorative ? undefined : "status"}
        >
          <Icon name="activity" size={26} />
          {!decorative && (
            <span>
              {failed || status === "error"
                ? "Animation unavailable"
                : "Loading animated guide…"}
            </span>
          )}
          {!decorative && (failed || status === "error") && (
            <button
              className="text-button"
              onClick={() => {
                setImageState({ url, status: "loading" });
                setAttempt((value) => value + 1);
                reload();
              }}
            >
              Retry animation
            </button>
          )}
        </div>
      )}
    </div>
  );
}
