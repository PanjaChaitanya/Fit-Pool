import { useState } from "react";
import emailjs from "emailjs-com";
import NavSideBar from "../components/NavSideBar";
import { Button, TextField } from "@mui/material";
import { motion } from "framer-motion";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Initialize EmailJS
  emailjs.init("mZ7ToKGAYFVaRarfg"); // Replace with your actual Public Key

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    // Send email using EmailJS
    emailjs
      .send("service_chaitanya", "template_chaitanya", {
        name: name,
        from_email: email,
        subject: subject,
        message: message,
      })
      .then((response) => {
        alert("Email sent successfully!");
        console.log("Success:", response.status, response.text);

        // Reset form fields after successful submission
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      })
      .catch((error) => {
        alert("Failed to send email. Please try again later.");
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex">
      {/* Contact Form Section */}
      <div className="flex-1 flex flex-col gap-10 align-middle justify-center max-h-screen overflow-y-auto red-scrollbar no-scrollbar">
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold montserratFont">
            Contact <span className="text-red-500">Me</span>
          </h1>
          <p className="text-lg">Contact us for any questions or concerns.</p>
        </motion.div>

        {/* Contact Form Block */}
        <div className="flex flex-wrap justify-center gap-x-10 align-middle">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="contact-form flex flex-col gap-5"
          >
            <div className="form-header text-center text-2xl font-bold montserratFont">
              Message me
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <TextField
                className="w-3xs"
                label="Name"
                type="text"
                placeholder="Enter your name"
                variant="standard"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                className="w-3xs"
                label="Email"
                type="email"
                placeholder="Enter your email"
                variant="standard"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                className="w-3xs"
                label="Subject"
                type="text"
                placeholder="Enter subject"
                variant="standard"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <TextField
                id="filled-textarea"
                label="Message"
                placeholder="Enter your message here"
                multiline
                variant="filled"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div>
                <Button type="submit" className="btnFonts" variant="outlined">
                  Send Message
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Contact Info Block */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="contact-info flex flex-col gap-10"
          >
            <div className="contact-info-header text-center text-2xl font-bold montserratFont">
              Contact Info
            </div>
            <div className="contact-info-content flex flex-col gap-5">
              <div className="contect-info-content-line flex gap-5">
                <img src="/icons/icon-name.png" className="icon" alt="name-icon" />
                <div className="contact-info-text">
                  <h6>Name</h6>
                  <p>Chaitanya Panja</p>
                </div>
              </div>
              <div className="contect-info-content-line flex gap-5">
                <img src="/icons/icon-location.png" className="icon" alt="location-icon" />
                <div className="contact-info-text">
                  <h6>Location</h6>
                  <p>Andhra Pradesh State, Bhimavaram</p>
                </div>
              </div>
              <div className="contect-info-content-line flex gap-5">
                <img src="/icons/icon-phone.png" className="icon" alt="phone-icon" />
                <div className="contact-info-text">
                  <h6>Call</h6>
                  <p>+91 9059944125</p>
                </div>
              </div>
              <div className="contect-info-content-line flex gap-5">
                <img src="/icons/icon-email.png" className="icon" alt="email-icon" />
                <div className="contact-info-text">
                  <h6>Email</h6>
                  <p>panjachaitanya23@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sidebar */}
      <div>
        <NavSideBar />
      </div>
    </div>
  );
};

export default Contact;