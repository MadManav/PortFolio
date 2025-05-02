import React, { useState, useEffect } from "react";
import "./Project.css";
import Carousel from "../components/Carousel";
import { FiCode, FiGlobe, FiBook } from "react-icons/fi";

import image_edit from "../assets/images/Image_editor.png";
import nerdgalaxy from "../assets/images/nerdgalaxy.png";
import cafedine from "../assets/images/cafedine.png";

function Projects() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projectItems = [
    {
      title: "Cafe Delight - Digital Menu Solution",
      description: "A QR-code activated digital menu system for cafés featuring real-time updates, dietary filters, and dynamic pricing.",
      id: 1,
      icon: <FiGlobe className="carousel-icon" />,
      image: cafedine,
      tech: ["Django", "React", "MySQL", "QR Generation"],
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
      code: "https://github.com/MadManav/Nerd-Galaxy",
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-header-container">
        <h2 className="projects-title">Projects</h2>
      </div>
      
      {isMobile ? (
        <div className="projects-mobile-grid">
          {projectItems.map((project) => (
            <div key={project.id} className="project-card">
              <img 
                src={project.image} 
                alt={project.title} 
                className="project-image"
              />
              <div className="card-overlay">
                <div className="overlay-content">
                  <h3 className="overlay-title">{project.title}</h3>
                  <p className="overlay-description">{project.description}</p>
                  <div className="overlay-tech">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="overlay-links">
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        Demo
                      </a>
                    )}
                    {project.code && (
                      <a href={project.code} target="_blank" rel="noopener noreferrer">
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="carousel-wrapper">
          <Carousel 
            items={projectItems}
            baseWidth={1000}
            autoplay={false}
            autoplayDelay={5000}
            pauseOnHover={true}
            loop={true}
          />
        </div>
      )}
    </section>
  );
}

export default Projects;