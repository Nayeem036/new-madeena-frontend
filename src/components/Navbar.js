import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Booking", path: "/booking" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logoGroup}>
          <span style={styles.logoBadge}>✨</span>
          <h2 style={styles.logoText}>Madeena<span style={styles.goldText}>Catering</span></h2>
        </Link>

        {/* Desktop Links */}
        <nav style={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              style={{
                ...styles.navLink,
                ...(location.pathname === link.path ? styles.activeLink : {})
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button style={styles.mobileBtn} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div style={styles.mobileDrawer}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              style={styles.mobileNavLink}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  logoBadge: {
    fontSize: "20px"
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: "-0.5px"
  },
  goldText: {
    color: "#F59E0B"
  },
  desktopNav: {
    display: "flex",
    gap: "32px",
    alignItems: "center"
  },
  navLink: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#94A3B8",
    transition: "all 0.2s ease"
  },
  activeLink: {
    color: "#F59E0B",
    borderBottom: "2px solid #F59E0B",
    paddingBottom: "4px"
  },
  mobileBtn: {
    display: "none",
    background: "none",
    border: "none",
    color: "#FFFFFF",
    fontSize: "24px",
    cursor: "pointer"
  },
  mobileDrawer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "20px 24px",
    backgroundColor: "#0F172A",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
  },
  mobileNavLink: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#F8FAFC"
  }
};

export default Navbar;