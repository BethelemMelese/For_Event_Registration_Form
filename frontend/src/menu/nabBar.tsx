import React from "react";
import "../css/style.css";

const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li onClick={() => scrollToSection("home")}>Home</li>
        <li onClick={() => scrollToSection("speakers")}>Speakers</li>
        <li onClick={() => scrollToSection("registration")}>Register Now</li>
      </ul>
    </nav>
  );
};

export default Navbar;
