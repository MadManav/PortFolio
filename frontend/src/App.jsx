import React from "react";
import Navbar from "./components/NavBar.jsx";
import "./App.css";
import AboutMe from "./pages/AboutMe.jsx";
import Skills from "./pages/Skills.jsx";
import Projects from "./pages/Project.jsx"; // Add this line
import ContactForm from "./pages/Contact.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <div className="content">
        <AboutMe />
        <Skills />
        <Projects />
        <ContactForm />
      </div>
    </div>
  );
}

export default App;
