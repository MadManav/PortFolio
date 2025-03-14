import React from "react";
import manavimg from "../assets/images/manav.png";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about-me-container" id="about">
      <div className="content-wrapper">
        <div className="photo-section">
          <img
            src={manavimg}
            alt="Manav Dodani"
            className="profile-photo"
            loading="lazy"
          />
        </div>

        <div className="text-section">
          <div className="animated-title">
            <div className="text-top">
              <div>
                <span>Manav Dodani</span>
              </div>
            </div>
            <div className="text-bottom">
              <div>Full-Stack Developer</div>
            </div>
          </div>

          <p className="description-font">
            Hello, I'm Manav Dodani—a dedicated developer passionate about creating elegant, intuitive digital experiences. By blending creative design with robust coding, I transform complex challenges into seamless, user-friendly solutions.
          </p>
          <a
            href="/resume.pdf"
            download
            className="btn cube"
            aria-label="Download Resume"
          >
            <div className="bg-top">
              <div className="bg-inner"></div>
            </div>
            <div className="bg-right">
              <div className="bg-inner"></div>
            </div>
            <div className="bg">
              <div className="bg-inner"></div>
            </div>
            <div className="text">Download Resume</div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;