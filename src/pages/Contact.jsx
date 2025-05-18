import { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import AppShell from "../components/layout/AppShell";
import Button from "../components/ui/Button";
import { BodyText, SectionTitle } from "../components/system/Typography";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    emailjs.init("mZ7ToKGAYFVaRarfg");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !subject || !message) {
      setStatus({ type: "error", text: "Please complete all fields before sending." });
      return;
    }

    setSending(true);
    setStatus({ type: "", text: "" });

    try {
      await emailjs.send("service_chaitanya", "template_chaitanya", {
        name,
        from_email: email,
        subject,
        message,
      });

      setStatus({ type: "success", text: "Message sent. Thanks for reaching out." });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setStatus({ type: "error", text: "Unable to send right now. Please try again later." });
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <AppShell title="Contact" subtitle="Support channel">
      <section className="grid gap-4 xl:grid-cols-[1fr_1.2fr]">
        <article className="surface section-space">
          <SectionTitle>Let&apos;s collaborate</SectionTitle>
          <BodyText className="mt-3">
            Use this form for product feedback, bugs, or feature requests. You can also reach out directly with the
            details below.
          </BodyText>

          <div className="mt-8 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Name</p>
              <p className="mt-1 text-sm">Chaitanya Panja</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Location</p>
              <p className="mt-1 text-sm">Bhimavaram, Andhra Pradesh</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Phone</p>
              <p className="mt-1 text-sm">+91 9059944125</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Email</p>
              <p className="mt-1 text-sm">panjachaitanya23@gmail.com</p>
            </div>
          </div>
        </article>

        <article className="surface section-space">
          <SectionTitle>Send a message</SectionTitle>
          <form className="mt-6 grid gap-3" onSubmit={handleSubmit}>
            <input
              className="field"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              className="field"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="field"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />
            <textarea
              className="textarea"
              placeholder="Message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />

            {status.text && (
              <p className={`text-sm ${status.type === "error" ? "text-red-500" : "text-[var(--success-500)]"}`}>
                {status.text}
              </p>
            )}

            <div className="pt-2">
              <Button type="submit" size="lg" disabled={sending}>
                {sending ? "Sending..." : "Send message"}
              </Button>
            </div>
          </form>
        </article>
      </section>
    </AppShell>
  );
};

export default Contact;
