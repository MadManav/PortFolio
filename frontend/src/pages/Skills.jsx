import React from "react";
import js from "../assets/svgs/js.svg";
import react from "../assets/svgs/react.svg";
import flask from "../assets/svgs/flask.svg";
import html from "../assets/svgs/html.svg";
import css from "../assets/svgs/css.svg";
import django from "../assets/svgs/django.svg";
import kivy from "../assets/svgs/kivy.svg";
import mysql from "../assets/svgs/mysql.svg";
import nodejs from "../assets/svgs/nodejs.svg";
import python from "../assets/svgs/python.svg";
import sqllite from "../assets/svgs/sqllite.svg";
import mongodb from "../assets/svgs/mongodb.svg";
import flutter from "../assets/svgs/flutter.svg";
import { useParallax } from 'react-scroll-parallax';
import "./Skills.css";



function Skills() {
  const skillsData = [
    {
      category: "Front-end",
      skills: [
        { name: "JavaScript", icon: js },
        { name: "React", icon: react },
        { name: "HTML", icon: html },
        { name: "CSS", icon: css },
      ],
    },
    {
      category: "Back-end",
      skills: [
        { name: "Django", icon: django },
        { name: "Node.js", icon: nodejs },
        { name: "Python", icon: python },
        { name: "Flask", icon: flask },
      ],
    },
    {
      category: "Database",
      skills: [
        { name: "SQLite", icon: sqllite },
        { name: "MySQL", icon: mysql },
        { name: "MongoDB", icon: mongodb },
      ],
    },
  ];
  return (
    <section id="skills" className="skills">
      <h2 className="skills__title">Skills</h2>
      <div className="skills__container">
        {skillsData.map((category, index) => (
          <div 
            key={category.category} 
            className="skills__category"
            style={{ animationDelay: `${0.2 + index * 0.2}s` }}
          >
            <h3 className="skills__category-title">
              {category.category}
              <span className="skills__underline"></span>
            </h3>
            <div className="skills__grid">
              {category.skills.map((skill, idx) => (
                <div 
                  key={skill.name} 
                  className="skills__card"
                  style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                >
                  <div className="skills__icon-container">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="skills__icon"
                    />
                  </div>
                  <p className="skills__name">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
