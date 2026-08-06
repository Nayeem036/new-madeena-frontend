import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Booking", path: "/booking" },
    { name: "Contact", path: "/contact" }
  ];

  // Dynamically listen for mobile screen width (<768px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logoGroup}>
          <span style={styles.logoBadge}></span>
          <h2 style={styles.logoText}>
            New Madeena<span style={styles.goldText}> Catering</span>
          </h2>
        </Link>

        {/* Desktop Navigation (Only rendered when NOT mobile) */}
        {!isMobile && (
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
        )}

        {/* Mobile Hamburger Button (Only rendered when IS mobile) */}
        {isMobile && (
          <button style={styles.mobileBtn} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✕" : "☰"}
          </button>
        )}
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {isMobile && isOpen && (
        <div style={styles.mobileDrawer}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                ...styles.mobileNavLink,
                ...(location.pathname === link.path ? styles.activeMobileLink : {})
              }}
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
    backgroundColor: "#0F172A",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "14px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoGroup: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  logoBadge: {
    fontSize: "18px"
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: "-0.5px",
    margin: 0
  },
  goldText: {
    color: "#F59E0B"
  },
  desktopNav: {
    display: "flex",
    gap: "28px",
    alignItems: "center"
  },
  navLink: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#94A3B8",
    paddingBottom: "4px"
  },
  activeLink: {
    color: "#F59E0B",
    borderBottom: "2px solid #F59E0B"
  },
  mobileBtn: {
    background: "none",
    border: "none",
    color: "#FFFFFF",
    fontSize: "26px",
    cursor: "pointer",
    padding: "4px 8px"
  },
  mobileDrawer: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    padding: "16px 24px 24px",
    backgroundColor: "#1E293B",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)"
  },
  mobileNavLink: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#94A3B8"
  },
  activeMobileLink: {
    color: "#F59E0B",
    fontWeight: "700"
  }
};

export default Navbar;