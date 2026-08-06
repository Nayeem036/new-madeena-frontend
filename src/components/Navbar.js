import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>New Madeena Star Catering</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/menu" style={styles.link}>Menu</Link>
        <Link to="/booking" style={styles.link}>Booking</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "#ffb703",
    padding: "15px 20px",
    width: "100%",
    boxSizing: "border-box",
    gap: "10px"
  },
  logo: {
    fontSize: "clamp(16px, 4vw, 24px)",
    margin: 0,
    color: "#2C3E50",
    fontWeight: "700"
  },
  links: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  link: {
    textDecoration: "none",
    color: "#2C3E50",
    fontWeight: "600",
    fontSize: "15px"
  }
};

export default Navbar;