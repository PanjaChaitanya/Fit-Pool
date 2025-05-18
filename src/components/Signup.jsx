import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utilities/firebase";
import Button from "./ui/Button";

const Signup = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmSignUpPassword, setConfirmSignUpPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInMessage, setSignInMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  if (!isOpen || user) {
    return null;
  }

  const onSignUp = async (event) => {
    event.preventDefault();
    if (signUpPassword !== confirmSignUpPassword) {
      setSignUpMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setSignUpMessage("");

    try {
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      setSignUpMessage("Account created. Switch to sign in.");
      setIsSignUp(false);
    } catch (error) {
      setSignUpMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSignIn = async (event) => {
    event.preventDefault();

    setLoading(true);
    setSignInMessage("");
    try {
      await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
      navigate("/searchexercises");
    } catch (error) {
      setSignInMessage(error.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-black/40 px-4">
      <div className="w-full max-w-[920px] overflow-hidden rounded-2xl border border-[var(--line-color)] bg-[var(--bg-panel)]">
        <div className="grid lg:grid-cols-[1fr_280px]">
          <div className="p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{isSignUp ? "Create account" : "Welcome back"}</h2>
              <button type="button" onClick={onClose} className="text-sm text-[var(--text-muted)]">
                Close
              </button>
            </div>

            {isSignUp ? (
              <form className="grid gap-3" onSubmit={onSignUp}>
                <input
                  className="field"
                  type="email"
                  value={signUpEmail}
                  placeholder="Email address"
                  onChange={(event) => setSignUpEmail(event.target.value)}
                  required
                />
                <input
                  className="field"
                  type="password"
                  value={signUpPassword}
                  placeholder="Password"
                  onChange={(event) => setSignUpPassword(event.target.value)}
                  required
                />
                <input
                  className="field"
                  type="password"
                  value={confirmSignUpPassword}
                  placeholder="Confirm password"
                  onChange={(event) => setConfirmSignUpPassword(event.target.value)}
                  required
                />
                {signUpMessage && <p className="text-sm text-red-500">{signUpMessage}</p>}
                <div className="pt-2">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create account"}
                  </Button>
                </div>
              </form>
            ) : (
              <form className="grid gap-3" onSubmit={onSignIn}>
                <input
                  className="field"
                  type="email"
                  value={signInEmail}
                  placeholder="Email address"
                  onChange={(event) => setSignInEmail(event.target.value)}
                  required
                />
                <input
                  className="field"
                  type="password"
                  value={signInPassword}
                  placeholder="Password"
                  onChange={(event) => setSignInPassword(event.target.value)}
                  required
                />
                {signInMessage && <p className="text-sm text-red-500">{signInMessage}</p>}
                <div className="pt-2">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </form>
            )}
          </div>

          <aside className="border-t border-[var(--line-color)] bg-[var(--bg-soft)] p-6 lg:border-t-0 lg:border-l">
            <img
              src="/images/fitpool.png"
              alt="Fit Pool logo"
              className="mx-auto h-20 w-20 rounded-full border border-[var(--line-color)]"
            />
            <p className="mt-6 text-sm font-semibold">
              {isSignUp ? "Already have an account?" : "Need a new account?"}
            </p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              {isSignUp
                ? "Sign in to continue your workout tracking."
                : "Create an account to unlock exercise browsing."}
            </p>
            <div className="mt-5">
              <Button variant="secondary" onClick={() => setIsSignUp((value) => !value)}>
                {isSignUp ? "Go to sign in" : "Go to sign up"}
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Signup;
