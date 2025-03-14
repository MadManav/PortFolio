import React, { useEffect, useState } from "react";
import { Link, scrollSpy, Events } from "react-scroll";
import "./NavBar.css";

const NavBar = () => {
  const navItems = ["About", "Skills", "Projects", "Contact"];
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initial update on mount
    scrollSpy.update();
    Events.scrollEvent.register("end", () => {
      scrollSpy.update();
    });
    return () => {
      Events.scrollEvent.remove("end");
    };
  }, []);

  return (
    <header className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">Manav</div>
        {/* Hamburger Toggle for Mobile */}
        <button
          className="navbar__toggle"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
        </button>
        <nav className={`navbar__nav ${isMobileMenuOpen ? "mobile" : ""}`}>
          {navItems.map((item) => (
            <Link
              key={item}
              to={item.toLowerCase()}
              smooth={true}
              duration={500}
              spy={true}
              activeClass="active"
              className="navbar__item"
              onClick={() => setMobileMenuOpen(false)} // close mobile menu on click
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
