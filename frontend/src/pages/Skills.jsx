import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import js from "../assets/svgs/js.svg";
import react from "../assets/svgs/react.svg";
import flask from "../assets/svgs/flask.svg";
import html from "../assets/svgs/html.svg";
import css from "../assets/svgs/css.svg";
import django from "../assets/svgs/django.svg";
import mysql from "../assets/svgs/mysql.svg";
import nodejs from "../assets/svgs/nodejs.svg";
import python from "../assets/svgs/python.svg";
import sqllite from "../assets/svgs/sqllite.svg";
import mongodb from "../assets/svgs/mongodb.svg";
import vue from "../assets/svgs/vue.svg";
import fastapi from "../assets/svgs/fastapi.svg";
import frontend from "../assets/images/frontend.png";
import backend from "../assets/images/backend.png";
import database from "../assets/images/database.png";
import "./Skills.css";

function Skills() {
    const [activeTab, setActiveTab] = useState("Front-end");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.1, // Reduced from 0.15
                when: "beforeChildren",
            }
        }
    };

    const skillCardVariants = {
        hidden: { 
            opacity: 0,
            y: "50vh", // Reduced from 100vh to make animation distance shorter
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 700, // Increased from 500
                damping: 25, // Decreased from 30
                duration: 0.1 // Reduced from 0.35
            }
        },
        exit: {
            y: "50vh", // Reduced from 100vh
            opacity: 0,
            transition: {
                duration: 0.15 // Reduced from 0.2
            }
        }
    };

    const skillsData = [
        {
            category: "Front-end",
            icon: frontend,
            skills: [
                { name: "React", icon: react },
                { name: "Vue", icon: vue },
                { name: "JavaScript", icon: js },
                { name: "HTML", icon: html },
                { name: "CSS", icon: css },
            ],
        },
        {
            category: "Back-end",
            icon: backend,
            skills: [
                { name: "Django", icon: django },
                { name: "Node.js", icon: nodejs },
                { name: "Python", icon: python },
                { name: "Flask", icon: flask },
                { name: "FastAPI", icon: fastapi },
            ],
        },
        {
            category: "Database",
            icon: database,
            skills: [
                { name: "SQLite", icon: sqllite },
                { name: "MySQL", icon: mysql },
                { name: "MongoDB", icon: mongodb },
            ],
        },
    ];

    return (
        <motion.div
            className="skills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }} // Reduced from 0.3
        >
            <h2 className="skills__title">SKILLS</h2>
            <p className="skills__tagline">
                I harness modern tools and technologies to craft seamless, high-quality web experiences.
            </p>

            <div className="skills__grid-container">
                <div className="skills__tabs">
                    {skillsData.map((category) => (
                        <motion.button
                            key={category.category}
                            className={`skills__tab ${activeTab === category.category ? 'active' : ''}`}
                            onClick={() => setActiveTab(category.category)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.01 }} // Reduced from 0.1
                        >
                            <img src={category.icon} alt={category.category} className="skills__tab-icon" />
                            {category.category}
                        </motion.button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {skillsData.map((category) => (
                        activeTab === category.category && (
                            <motion.div
                                key={category.category}
                                className="skills__grid"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                {category.skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        className="skills__card"
                                        variants={skillCardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        custom={index} // Added to help with staggered animations if needed
                                    >
                                        <img src={skill.icon} alt={skill.name} className="skills__icon" />
                                        <h3 className="skills__name">{skill.name}</h3>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default Skills;