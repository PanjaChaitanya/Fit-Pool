import { Link } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import Icon from "../components/ui/Icon";
export default function About({ contact = false }) {
  return (
    <AppShell
      title={
        contact ? "A conversation starts here." : "Room for a little progress."
      }
      subtitle="A personal fitness space, built by Chaitanya Panja."
    >
      <section className="panel about-intro">
        <span className="about-wordmark">fitpool.</span>
        <h2>
          Movement. Nourishment.
          <br />A pace that’s yours.
        </h2>
        <p>
          Fitpool brings the everyday parts of looking after yourself into one
          quiet space. Find a movement, make a plan, learn what fuels you, and
          take the next small step.
        </p>
        <p>
          No account to create. Your routines, favorites, completed sessions,
          and food log are stored in this browser on this device. Clearing site
          data removes them. They do not sync between devices.
        </p>
        <div className="button-row">
          <a
            className="button primary"
            href="mailto:panjachaitanya23@gmail.com"
          >
            Say hello <Icon name="arrowUpRight" size={16} />
          </a>
          <a
            className="button secondary"
            href="https://github.com/PanjaChaitanya/Fit-Pool"
            target="_blank"
            rel="noreferrer"
          >
            View the project <Icon name="external" size={15} />
          </a>
        </div>
      </section>
      <div className="about-grid">
        <section className="panel">
          <div className="section-heading">
            <h2>Your space, explained.</h2>
            <Icon name="shield" />
          </div>
          <p className="muted">
            The tools run in your browser. Exercise, food, recipe, and weather
            searches contact their public data providers; those providers
            receive the search or location you request. Device location is
            requested only when you choose “Use my location”.
          </p>
          <p className="muted">
            You can export your current workout from My workout. Browser storage
            can be unavailable in private browsing or when storage is full, so
            keep a downloaded copy of anything important.
          </p>
          <Link to="/workout" className="text-link">
            Go to your workout <Icon name="arrowRight" size={15} />
          </Link>
        </section>
        <section className="panel">
          <div className="section-heading">
            <h2>Good things, shared openly.</h2>
            <Icon name="book" />
          </div>
          <ul className="credits-list">
            <li>
              <a
                href="https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb"
                target="_blank"
                rel="noreferrer"
              >
                ExerciseDB <Icon name="external" size={13} />
              </a>
              <span>
                Animated movement guides with muscle highlights · API usage
                terms apply
              </span>
            </li>
            <li>
              <a
                href="https://world.openfoodfacts.org"
                target="_blank"
                rel="noreferrer"
              >
                Open Food Facts <Icon name="external" size={13} />
              </a>
              <span>Food data · ODbL; product images · CC BY-SA</span>
            </li>
            <li>
              <a
                href="https://www.themealdb.com"
                target="_blank"
                rel="noreferrer"
              >
                TheMealDB <Icon name="external" size={13} />
              </a>
              <span>Recipe collection and imagery · API usage terms apply</span>
            </li>
            <li>
              <a href="https://open-meteo.com" target="_blank" rel="noreferrer">
                Open-Meteo <Icon name="external" size={13} />
              </a>
              <span>Forecasts, geocoding, CAMS air quality · CC BY 4.0</span>
            </li>
            <li>
              <a
                href="https://fonts.google.com/?query=Instrument"
                target="_blank"
                rel="noreferrer"
              >
                Instrument typefaces <Icon name="external" size={13} />
              </a>
              <span>
                Instrument Sans & Instrument Serif · SIL Open Font License
              </span>
            </li>
          </ul>
        </section>
      </div>
      <p className="source-credit">
        Fitpool is a personal fitness tool, not medical advice. Nutrition data
        may be incomplete; forecasts are model estimates. Open-Meteo’s free
        hosted API is for noncommercial use.
      </p>
    </AppShell>
  );
}
