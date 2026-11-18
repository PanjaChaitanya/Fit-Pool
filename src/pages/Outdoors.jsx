import { useEffect, useState } from "react";
import AppShell from "../components/layout/AppShell";
import Icon from "../components/ui/Icon";
import { requestJson, useLocalState } from "../utilities/storage";
function describe(code) {
  if (code === 0) return "Clear skies";
  if (code <= 3) return "A little cloudy";
  if (code <= 48) return "Foggy conditions";
  if (code <= 67) return "Rain in the air";
  if (code <= 77) return "Snowy conditions";
  if (code <= 82) return "Passing showers";
  if (code <= 86) return "Snow showers";
  return "Thunderstorms";
}
export default function Outdoors() {
  const [location, setLocation] = useLocalState("location", {
    name: "Bengaluru",
    country: "India",
    latitude: 12.9716,
    longitude: 77.5946,
  });
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [weather, setWeather] = useState(null);
  const [air, setAir] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setError("");
    setAir(null);
    setWeather(null);
    const coordinates = `latitude=${location.latitude}&longitude=${location.longitude}`;
    Promise.allSettled([
      requestJson(
        `https://api.open-meteo.com/v1/forecast?${coordinates}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=2`,
        { signal: controller.signal },
      ),
      requestJson(
        `https://air-quality-api.open-meteo.com/v1/air-quality?${coordinates}&current=us_aqi,pm2_5&timezone=auto`,
        { signal: controller.signal },
      ),
    ]).then(([forecast, quality]) => {
      if (controller.signal.aborted) return;
      if (forecast.status === "fulfilled") {
        setWeather(forecast.value);
        setStatus("ready");
      } else {
        setStatus("error");
        setError("The forecast is unavailable right now. Please try again.");
      }
      if (quality.status === "fulfilled") setAir(quality.value);
    });
    return () => controller.abort();
  }, [location, refresh]);
  const search = async (event) => {
    event.preventDefault();
    if (query.trim().length < 2) return;
    setSearching(true);
    setSearchError("");
    try {
      const data = await requestJson(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=5&language=en&format=json`,
      );
      setPlaces(data.results || []);
      if (!data.results?.length)
        setSearchError(
          "No matching cities. Try a nearby town or another spelling.",
        );
    } catch {
      setSearchError("City search is unavailable. Please try again.");
    } finally {
      setSearching(false);
    }
  };
  const locate = () => {
    if (!navigator.geolocation) {
      setSearchError(
        "Location is unavailable in this browser. Search for a city instead.",
      );
      return;
    }
    setSearching(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          name: "Your location",
          country: "",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setSearching(false);
        setSearchError("");
        setPlaces([]);
      },
      () => {
        setSearching(false);
        setSearchError(
          "Location access wasn’t available. You can search for your city instead.",
        );
      },
      { timeout: 10000, maximumAge: 300000 },
    );
  };
  const current = weather?.current;
  const aqi = air?.current?.us_aqi;
  const airLabel =
    aqi == null
      ? "Not available"
      : aqi <= 50
        ? "Good"
        : aqi <= 100
          ? "Moderate"
          : aqi <= 150
            ? "Unhealthy for sensitive groups"
            : aqi <= 200
              ? "Unhealthy"
              : aqi <= 300
                ? "Very unhealthy"
                : "Hazardous";
  const hours =
    weather?.hourly?.time
      .map((time, index) => ({
        time,
        temperature: weather.hourly.temperature_2m[index],
        rain: weather.hourly.precipitation_probability[index],
      }))
      .filter((hour) => hour.time >= weather.current.time.slice(0, 13))
      .slice(0, 6) || [];
  return (
    <AppShell
      title="A little fresh air."
      subtitle="See what’s outside before you lace up."
      headerActions={
        <button
          className="button secondary"
          onClick={() => setRefresh((value) => value + 1)}
          disabled={status === "loading"}
        >
          <Icon name="refresh" size={16} />
          Refresh conditions
        </button>
      }
    >
      <section className="panel location-panel">
        <form className="search-form" onSubmit={search}>
          <label className="search-field">
            <Icon name="pin" />
            <input
              aria-label="Search city"
              placeholder="Find your city..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              required
              minLength={2}
              maxLength={80}
            />
          </label>
          <button className="button primary" disabled={searching}>
            {searching ? "Finding…" : "Find city"}
          </button>
        </form>
        <button className="text-button" onClick={locate} disabled={searching}>
          <Icon name="target" size={16} />
          Use my location
        </button>
        {searchError && (
          <p className="error-message" role="alert">
            {searchError}
          </p>
        )}
        {places.length > 0 && (
          <div className="city-results">
            {places.map((place) => (
              <button
                key={place.id}
                onClick={() => {
                  setLocation({
                    name: place.name,
                    country: place.country,
                    latitude: place.latitude,
                    longitude: place.longitude,
                  });
                  setPlaces([]);
                  setQuery("");
                }}
              >
                {place.name}
                <span>
                  {[place.admin1, place.country].filter(Boolean).join(", ")}
                </span>
                <Icon name="arrowRight" size={15} />
              </button>
            ))}
          </div>
        )}
      </section>
      {status === "loading" && (
        <div className="loading-state" role="status">
          <span className="spinner" />
          Checking the skies over {location.name}…
        </div>
      )}
      {error && (
        <div className="empty-state error-state" role="alert">
          <Icon name="cloud" size={32} />
          <h2>The skies can wait a moment.</h2>
          <p>{error}</p>
          <button
            className="button secondary"
            onClick={() => setRefresh((value) => value + 1)}
          >
            Try again
          </button>
        </div>
      )}
      {current && (
        <>
          <div className="weather-grid">
            <section className="panel weather-main">
              <div className="section-heading">
                <span className="location-name">
                  <Icon name="pin" size={16} />
                  {location.name}
                  {location.country ? `, ${location.country}` : ""}
                </span>
                <span className="small-label">
                  {weather.timezone_abbreviation}
                </span>
              </div>
              <div className="weather-now">
                <div>
                  <span className="weather-temperature">
                    {Math.round(current.temperature_2m)}
                    <small>°C</small>
                  </span>
                  <h2>{describe(current.weather_code)}</h2>
                  <p>
                    Feels like {Math.round(current.apparent_temperature)}° · H{" "}
                    {Math.round(weather.daily.temperature_2m_max[0])}° / L{" "}
                    {Math.round(weather.daily.temperature_2m_min[0])}°
                  </p>
                </div>
                <Icon
                  name={current.weather_code <= 2 ? "sun" : "cloud"}
                  size={90}
                />
              </div>
              <div className="weather-measures">
                <div>
                  <Icon name="wind" />
                  <span>Wind</span>
                  <strong>{current.wind_speed_10m} km/h</strong>
                </div>
                <div>
                  <Icon name="cloud" />
                  <span>Humidity</span>
                  <strong>{current.relative_humidity_2m}%</strong>
                </div>
                <div>
                  <Icon name="sun" />
                  <span>Peak UV today</span>
                  <strong>{weather.daily.uv_index_max[0] ?? "—"}</strong>
                </div>
              </div>
            </section>
            <section className="panel air-panel">
              <div className="section-heading">
                <h2>A breath of perspective.</h2>
                <Icon name="wind" />
              </div>
              <span className="small-label">
                US Air Quality Index · Model estimate
              </span>
              <div className="air-value">
                {aqi == null ? "—" : Math.round(aqi)}
              </div>
              <h3>{airLabel}</h3>
              <div className="aqi-track" aria-hidden="true">
                <span
                  style={{
                    left: `${Math.min(100, ((aqi || 0) / 300) * 100)}%`,
                  }}
                />
              </div>
              <div className="scale-labels">
                <span>0</span>
                <span>150</span>
                <span>300+</span>
              </div>
              <p className="muted">
                {air
                  ? `PM2.5: ${air.current.pm2_5 ?? "—"} µg/m³. Conditions can vary along your route.`
                  : "Air quality data is temporarily unavailable. The weather forecast is still available."}
              </p>
              <a
                className="text-link"
                href="https://www.airnow.gov/aqi/aqi-basics/"
                target="_blank"
                rel="noreferrer"
              >
                Understand the AQI <Icon name="external" size={14} />
              </a>
            </section>
          </div>
          <section className="panel hourly-panel">
            <div className="section-heading">
              <h2>Ahead of you</h2>
              <span className="muted">Next six hours · Local time</span>
            </div>
            <div className="hourly-grid">
              {hours.map((hour) => (
                <div key={hour.time}>
                  <span>{hour.time.slice(11, 16)}</span>
                  <Icon name={hour.rain > 40 ? "cloud" : "sun"} size={25} />
                  <strong>{Math.round(hour.temperature)}°</strong>
                  <span>{hour.rain}% rain</span>
                </div>
              ))}
            </div>
          </section>
          <div className="sun-times">
            <span>
              <Icon name="sun" />
              Sunrise <strong>{weather.daily.sunrise[0].slice(11, 16)}</strong>
            </span>
            <span>
              <Icon name="moon" />
              Sunset <strong>{weather.daily.sunset[0].slice(11, 16)}</strong>
            </span>
            <span className="small-label">
              Forecast updated {current.time.slice(11, 16)} local time
            </span>
          </div>
        </>
      )}
      <p className="source-credit">
        Weather:{" "}
        <a href="https://open-meteo.com" target="_blank" rel="noreferrer">
          Open-Meteo
        </a>
        . Air quality: CAMS ENSEMBLE / CAMS global via Open-Meteo. Modelled
        conditions, not a street-level measurement. Data licensed CC BY 4.0.
      </p>
    </AppShell>
  );
}
