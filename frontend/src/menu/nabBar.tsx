import React, { useState } from "react";
import "../css/style.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Image from "../images/photo_2025-02-16_12-00-20.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="hamburger">
        <IconButton id="check" onClick={toggleMenu}>
          {isOpen ? (
            <CloseIcon className="bar" />
          ) : (
            <MenuIcon className="bar" />
          )}
        </IconButton>
      </div>
      <div className="top-bar-logo">
        <img alt="Grand Habesha Event Logo" src={Image} />
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li
          onClick={() => {
            scrollToSection("home");
            toggleMenu();
          }}
        >
          Home
        </li>
        <li
          onClick={() => {
            scrollToSection("speakers");
            toggleMenu();
          }}
        >
          Speakers
        </li>
        <li
          onClick={() => {
            scrollToSection("registration");
            toggleMenu();
          }}
        >
          Register Now
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
