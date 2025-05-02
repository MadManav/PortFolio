import React, { useEffect, useState } from "react";
import { Link, scroller, Events } from "react-scroll";
import "./NavBar.css";
import ThemeSwitch from "./ThemeSwitch";

const NavBar = () => {
  const navItems = ["About", "Skills", "Projects", "Contact", "Resume"];
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  // Simple scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Check which section is in view
      const sections = navItems
        .filter(item => item !== "Resume")
        .map(item => item.toLowerCase());
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is in the viewport (with some offset for navbar)
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Set initial scroll state and active section
    handleScroll();

    // Add scroll event
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navItems]);

  // Handle click navigation
  const handleNavClick = (to) => {
    setMobileMenuOpen(false);
    setActiveSection(to);
    
    scroller.scrollTo(to, {
      duration: 500,
      smooth: true,
      offset: -80
    });
  };

  const renderNavLink = (item) => {
    if (item === "Resume") {
      return (
        <a
          key={item}
          href="/resume.pdf"
          download="ManavDodani_Resume.pdf"
          className="navbar__item navbar__item-resume"
          onClick={() => setMobileMenuOpen(false)}
        >
          {item}
        </a>
      );
    }
    
    const sectionId = item.toLowerCase();
    
    return (
      <div
        key={item}
        className={`navbar__item ${activeSection === sectionId ? 'active' : ''}`}
        onClick={() => handleNavClick(sectionId)}
        style={{ cursor: 'pointer' }}
      >
        {item}
      </div>
    );
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar__container">
        <div className="navbar__logo">
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M 39.2975 22.825L 39.2975 22.825Q 38.864375 29.321875 38.864375 31.425625L 38.864375 31.425625Q 38.864375 37.736875 39.17375 39.655L 39.17375 39.655L 39.42125 41.325625L 47.34125 20.72125Q 52.53875 23.753125 59.0975 25.0525L 59.0975 25.0525Q 58.85 30.559375 57.550625 37.4275Q 56.25125 44.295625 55.075625 48.379375L 55.075625 48.379375L 53.9 52.463125Q 50.620625 54.62875 43.319375 55.680625L 43.319375 55.680625Q 44.680625 50.91625 45.5159375 46.523125Q 46.35125 42.13 46.536875 40.15L 46.536875 40.15L 46.660625 38.108125Q 46.041875 39.4075 45.0209375 41.449375Q 44 43.49125 41.2465625 47.7915625Q 38.493125 52.091875 36.3275 53.948125L 36.3275 53.948125Q 35.151875 51.596875 34.285625 47.636875Q 33.419375 43.676875 33.11 40.8925L 33.11 40.8925L 32.800625 38.108125Q 32.429375 38.850625 31.8415625 40.27375Q 31.25375 41.696875 30.2946875 47.018125Q 29.335625 52.339375 29.335625 58.58875L 29.335625 58.58875Q 28.593125 58.2175 27.3865625 57.536875Q 26.18 56.85625 23.82875 54.814375Q 21.4775 52.7725 20.673125 50.7925L 20.673125 50.7925Q 21.23 44.295625 22.529375 38.3246875Q 23.82875 32.35375 24.880625 29.63125L 24.880625 29.63125L 25.870625 26.846875Q 28.345625 25.485625 32.2128125 24.2790625Q 36.08 23.0725 39.2975 22.825Z"></path>
          </svg>
        </div>
        
        <button
          className={`navbar__toggle ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
        >
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
        </button>

        <nav className={`navbar__nav ${isMobileMenuOpen ? "mobile" : ""}`}>
          <div className="navbar__theme-switch">
            <ThemeSwitch />
          </div>
          {navItems.map(renderNavLink)}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;