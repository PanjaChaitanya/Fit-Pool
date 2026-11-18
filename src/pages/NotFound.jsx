import { Link } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import Icon from "../components/ui/Icon";
export default function NotFound() {
  return (
    <AppShell
      title="A little off the path."
      subtitle="We couldn’t find that page or movement."
    >
      <div className="panel empty-state">
        <Icon name="pin" size={32} />
        <h2>Let’s find your way back.</h2>
        <p>Your next good session is still waiting.</p>
        <Link className="button primary" to="/">
          Back to overview <Icon name="arrowRight" size={16} />
        </Link>
      </div>
    </AppShell>
  );
}
