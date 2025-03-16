import React, { useEffect, useRef } from "react";
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
import "./Skills.css";

function Skills() {
  const skillsRef = useRef(null);
  const categoryRefs = useRef([]);
  const cardRefs = useRef([]);

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

  // Initialize refs
  useEffect(() => {
    categoryRefs.current = categoryRefs.current.slice(0, skillsData.length);
    let totalCards = 0;
    skillsData.forEach(category => {
      totalCards += category.skills.length;
    });
    cardRefs.current = cardRefs.current.slice(0, totalCards);
  }, [skillsData]);

  // Intersection Observer for revealing animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -20% 0px"
    };

    const categoryObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          categoryObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    categoryRefs.current.forEach(ref => {
      if (ref) categoryObserver.observe(ref);
    });

    // Separate observer for skill cards with different threshold
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Staggered animation
          setTimeout(() => {
            entry.target.classList.add('card-in-view');
          }, index * 50);
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cardRefs.current.forEach(ref => {
      if (ref) cardObserver.observe(ref);
    });

    return () => {
      categoryObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  // Adding mouse movement effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Parallax effect for skills section background
      if (skillsRef.current) {
        const rect = skillsRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const offsetX = (mouseX - centerX) / 40;
        const offsetY = (mouseY - centerY) / 40;
        
        skillsRef.current.style.setProperty('--bg-offset-x', `${offsetX}px`);
        skillsRef.current.style.setProperty('--bg-offset-y', `${offsetY}px`);
      }
    };

    // Add cards mouse follow effect
    const cards = document.querySelectorAll('.skills__card');
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--x', `${x}%`);
        card.style.setProperty('--y', `${y}%`);
        
        // Rotation effect
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (e.clientY - rect.top - centerY) / 10;
        const rotateY = (centerX - (e.clientX - rect.left)) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        
        // Move icon slightly
        const icon = card.querySelector('.skills__icon');
        if (icon) {
          icon.style.transform = `translateX(${rotateY * 0.5}px) translateY(${rotateX * 0.5}px)`;
        }
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        const icon = card.querySelector('.skills__icon');
        if (icon) {
          icon.style.transform = '';
        }
      });
    });

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const skillsSection = document.getElementById('skills');
      
      if (skillsSection) {
        const skillsTop = skillsSection.offsetTop;
        const skillsHeight = skillsSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition > skillsTop - windowHeight / 2 && 
            scrollPosition < skillsTop + skillsHeight - windowHeight / 2) {
          // Trigger floating animation for icons
          document.querySelectorAll('.skills__icon').forEach((icon, index) => {
            icon.style.animation = `floatIcon 3s infinite ease-in-out alternate ${index * 0.1}s`;
          });
          
          // Add pulsing effect to title
          const title = document.querySelector('.skills__title');
          if (title) {
            title.classList.add('pulse-animation');
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="skills__particles"></div>
      <h2 className="skills__title">Skills</h2>
      <div className="skills__container">
        {skillsData.map((category, index) => (
          <div 
            key={category.category} 
            className="skills__category"
            ref={el => categoryRefs.current[index] = el}
          >
            <h3 className="skills__category-title">
              {category.category}
              <span className="skills__underline"></span>
            </h3>
            <div className="skills__grid">
              {category.skills.map((skill, idx) => {
                const globalIdx = index * 4 + idx; // Unique index across all cards
                return (
                  <div 
                    key={skill.name} 
                    className="skills__card"
                    ref={el => cardRefs.current[globalIdx] = el}
                    data-skill={skill.name.toLowerCase()}
                  >
                    <div className="skills__icon-container">
                      <div className="skills__icon-glow"></div>
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="skills__icon"
                        loading="lazy"
                      />
                    </div>
                    <p className="skills__name">{skill.name}</p>
                    <div className="skills__progress-bar">
                      <div className="skills__progress-fill"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;