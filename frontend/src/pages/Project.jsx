import React from "react";
import "./Project.css";
import Carousel from "../components/Carousel";
import { FiCode, FiGlobe, FiBook } from "react-icons/fi";

// Sample images (replace with your actual imports)
import image_edit from "../assets/images/Image_editor.png";
import nerdgalaxy from "../assets/images/nerdgalaxy.png";
import cafedine from "../assets/images/cafedine.png";

function Projects() {
  const projectItems = [
    {
      title: "Cafe Delight - Digital Menu Solution",
      description: "A QR-code activated digital menu system for cafés featuring real-time updates, dietary filters, and dynamic pricing.",
      id: 1,
      icon: <FiGlobe className="carousel-icon" />,
      image: cafedine,
      tech: ["Django", "React", "MySQL", "QR Generation"],
      // demo: "#",
      code: "https://github.com/MadManav/Cafe-Delight----Digital-Menu-Solution",
    },
    {
      title: "FunkEdit - Image Editor",
      description: "A image processing PWA with UI elements.",
      id: 2,
      icon: <FiCode className="carousel-icon" />,
      image: image_edit,
      tech: ["Flask", "Tailwindcss", "Mysql"],
      demo: "https://manav2005.pythonanywhere.com/",
      code: "https://github.com/MadManav/FunkEdit-Image-Editor",
    },
    {
      title: "Nerd Galaxy - Collaborative Study Platform",
      description: "Real-time collaborative workspace with markdown support, code snippets sharing, and video conferencing integration.",
      id: 3,
      icon: <FiBook className="carousel-icon" />,
      image: nerdgalaxy,
      tech: ["React", "Django", "WebSockets", "SQLite"],
      // demo: "#",
      code: "https://github.com/MadManav/Nerd-Galaxy",
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-header-container">
        <h2 className="projects-title">Projects</h2>
      </div>
      
      <div className="carousel-wrapper">
        <Carousel 
          items={projectItems}
          baseWidth={1000}
          autoplay={true}
          autoplayDelay={5000}
          pauseOnHover={true}
          loop={true}
        />
      </div>
    </section>
  );
}

export default Projects;
