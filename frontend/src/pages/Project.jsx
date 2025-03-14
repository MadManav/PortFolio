import React from "react";
import "./Project.css";
import image_edit from "../assets/images/Image_editor.png";
import nerdgalaxy from "../assets/images/nerdgalaxy.png";
import cafedine from "../assets/images/cafedine.png";

function Projects() {
  const projects = [
    {
      title: "Cafe Delight - Digital Menu Solution",
      description:
        "A QR-code activated digital menu system for cafés featuring real-time updates, dietary filters, and dynamic pricing. Enhanced with Django admin controls for menu management.",
      image: cafedine,
      tech: ["Django", "React", "MySQL", "QR Generation"],
      demo: "#",
      code: "https://github.com/MadManav/Cafe-Delight----Digital-Menu-Solution",
    },
    {
      title: "FunkEdit - Retro Image Editor",
      description:
        "A nostalgic image processing PWA with retro UI elements. Supports format conversion, filters, and social sharing. Features offline capabilities and cloud storage integration.",
      image: image_edit,
      tech: ["Next.js", "WebAssembly", "IndexedDB", "Firebase"],
      demo: "#",
      code: "https://github.com/MadManav/FunkEdit---Retro-Image-Editor",
    },
    {
      title: "Nerd Galaxy - Collaborative Study Platform",
      description:
        "Real-time collaborative workspace with markdown support, code snippets sharing, and video conferencing integration. Implements JWT authentication and message persistence.",
      image: nerdgalaxy,
      tech: ["React", "TypeScript", "WebSockets", "MongoDB"],
      demo: "#",
      code: "https://github.com/MadManav/Nerd-Galaxy",
    },
  ];

  return (
    <section id="projects" className="projects-section" style={{ minHeight: '100vh' }}>
      <div className="projects-header-container">
        <svg viewBox="0 0 960 200">
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="70%" fontFamily="'Righteous', cursive" fontSize="80">
              Projects
            </text>
          </symbol>
          <g className="g-ants">
            <use xlinkHref="#s-text" className="text-copy" />
            <use xlinkHref="#s-text" className="text-copy" />
            <use xlinkHref="#s-text" className="text-copy" />
            <use xlinkHref="#s-text" className="text-copy" />
            <use xlinkHref="#s-text" className="text-copy" />
          </g>
        </svg>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-links">
                <a href={project.code} className="code-link" aria-label="View source code" target="_blank">
                  <span>Source Code</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;