import React, { useState, useEffect } from "react";
import Particles from "../components/Particles.jsx";
import Orb from "../components/Orb.jsx";
import manavimg from "../assets/images/manavbg.png";
import manavimgl from "../assets/images/manavbglight.png";
import "./AboutMe.css";


function AboutMe() {
  const [showLottie, setShowLottie] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLottie(true);
    }, 5000); // 5-second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="about-me-container" id="about">
      <div className="content-wrapper">
        <div className="photo-section">
          <div className="profile-orb-container">
            <Orb 
              hue={365}
              hoverIntensity={0.8}
              rotateOnHover={true}
              forceHoverState={false}
            />
            <img
              src={manavimg}
              alt="Manav Dodani"
              className="profile-photo"
              loading="lazy"
            />
          </div>
        </div>

        <div className="text-section">
          <div className="animated-title">
            <div className="text-top">
              <div>
                <span>Manav Dodani</span>
              </div>
            </div>
            <div className="text-bottom">
              <div>A Full Stack developer who crafts elegant, intuitive digital solutions by merging creative design with solid coding</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lottie Animation with delay */}
      <div className={`lottie-container ${showLottie ? 'visible' : ''}`}>
        <iframe 
          src="https://lottie.host/embed/bc867c3d-99cd-4d2c-8f1e-25a9a024eb81/nvnVbagEyP.lottie" 
          frameBorder="0"
          allowFullScreen
          title="Lottie Animation"
        ></iframe>
      </div>
    </section>
  );
}

export default AboutMe;