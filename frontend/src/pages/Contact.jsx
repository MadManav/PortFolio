import React, { useState, useEffect } from "react";
import "./Contact.css";
import axios from "axios";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animationError, setAnimationError] = useState(false);

  useEffect(() => {
    if (submissionStatus) {
      const timer = setTimeout(() => {
        setSubmissionStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submissionStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        "https://portfolio-5xsq.onrender.com/api/contact-messages/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setSubmissionStatus("success");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-title">
        <h2>Lets Connect</h2>
        <div className="title-underline"></div>
      </div>

      <div className="contact-content">
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="title">
              Contact Me,
              <br />
              <span>I'd love to hear from you</span>
            </div>
            
            <div className="status-messages">
              {submissionStatus === "success" && (
                <div className="success-message">
                  ✓ Message sent successfully!
                </div>
              )}
              {submissionStatus === "error" && (
                <div className="error-message">
                  ✗ Error sending message. Please try again.
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Name"
              name="name"
              className="input"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            <textarea
              placeholder="Message"
              name="message"
              className="textarea"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />

            <div className="login-with">
              <a href="https://www.linkedin.com/in/manavdodani/" target="_blank" rel="noreferrer" className="button-log">
                <svg
                  className="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path 
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a href="https://github.com/MadManav" target="_blank" rel="noreferrer" className="button-log">
                <svg
                  className="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path 
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
            
            <button 
              type="submit" 
              className="button-confirm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send →"}
            </button>
          </form>
        </div>

        <div className="animation-container">
          <div className="contact-image-container">
            {!animationError ? (
              <DotLottieReact 
                src="https://lottie.host/ccbffb85-db48-43b9-93e8-3d2b6798dcd0/PRjq9A8Qdb.lottie" 
                loop 
                autoplay
                onError={(e) => {
                  console.error("Animation failed to load");
                  setAnimationError(true);
                }}
              />
            ) : (
              <div>Animation could not be loaded</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;