import React, { useState, useEffect } from "react"; // Fix the import
import Navbar from "./components/NavBar.jsx";
import "./App.css";
import AboutMe from "./pages/AboutMe.jsx";
import Skills from "./pages/Skills.jsx";
import Projects from "./pages/Project.jsx";
import ContactForm from "./pages/Contact.jsx";
import NormalCursor from "./components/NormalCursor.jsx";
import Loader from "./components/Loader.jsx";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loaderKey, setLoaderKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Add CSS check for debugging
    setTimeout(() => {
      console.log("Checking CSS classes and styles:");
      const navbar = document.querySelector('.navbar');
      const navItems = document.querySelectorAll('.navbar__item');
      
      console.log("Navbar classes:", navbar?.className);
      console.log("Navbar computed style:", window.getComputedStyle(navbar));
      
      navItems.forEach((item, index) => {
        console.log(`NavItem ${index} classes:`, item.className);
        console.log(`NavItem ${index} computed style:`, window.getComputedStyle(item));
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div>
        {isLoading ? (
          <Loader key={loaderKey} />
        ) : (
          <>
            <NormalCursor />
            <Navbar />
            <div className="content">
              <AboutMe />
              <Skills />
              <Projects />
              <ContactForm />
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;  // Make sure this line exists