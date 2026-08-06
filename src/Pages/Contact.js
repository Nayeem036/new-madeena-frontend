import React from "react";

function Contact() {
  const primaryPhone = "9362877952";
  const secondaryPhone = "9043747889";
  const whatsappMsg = encodeURIComponent("Hello! I would like to inquire about catering services for my event.");

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.glassCard}>
        <div style={styles.headerArea}>
          <span style={styles.badge}>Get In Touch</span>
          <h1 style={styles.title}>Contact Us</h1>
          <p style={styles.subtitle}>We're here to make your special occasion delicious and memorable</p>
        </div>

        <div style={styles.contactList}>
          {/* WhatsApp Direct Chat Button */}
          <a 
            href={`https://wa.me/91${primaryPhone}?text=${whatsappMsg}`}
            target="_blank" 
            rel="noopener noreferrer"
            style={{ ...styles.card, ...styles.whatsappCard }}
          >
            <div style={styles.iconCircle}>💬</div>
            <div>
              <p style={styles.label}>WhatsApp Us</p>
              <p style={styles.value}>+91 {primaryPhone}</p>
            </div>
          </a>

          {/* Phone Number 1 */}
          <a href={`tel:+91${primaryPhone}`} style={styles.card}>
            <div style={styles.iconCircle}>📞</div>
            <div>
              <p style={styles.label}>Primary Phone</p>
              <p style={styles.value}>+91 {primaryPhone}</p>
            </div>
          </a>

          {/* Phone Number 2 */}
          <a href={`tel:+91${secondaryPhone}`} style={styles.card}>
            <div style={styles.iconCircle}>📞</div>
            <div>
              <p style={styles.label}>Secondary Phone</p>
              <p style={styles.value}>+91 {secondaryPhone}</p>
            </div>
          </a>

          {/* Email */}
          <a href="mailto:newmadeenacatering@gmail.com" style={styles.card}>
            <div style={styles.iconCircle}>✉️</div>
            <div>
              <p style={styles.label}>Email Address</p>
              <p style={styles.value}>newmadeenacatering@gmail.com</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "calc(100vh - 70px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    background: "radial-gradient(circle at top, #1E293B 0%, #0F172A 100%)"
  },
  glassCard: {
    width: "100%",
    maxWidth: "520px",
    backgroundColor: "rgba(30, 41, 59, 0.7)",
    backdropFilter: "blur(16px)",
    borderRadius: "24px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "36px 28px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
  },
  headerArea: {
    textAlign: "center",
    marginBottom: "28px"
  },
  badge: {
    display: "inline-block",
    padding: "6px 14px",
    backgroundColor: "rgba(245, 158, 11, 0.15)",
    color: "#F59E0B",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: "12px"
  },
  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: "8px"
  },
  subtitle: {
    fontSize: "14px",
    color: "#94A3B8"
  },
  contactList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px",
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    textDecoration: "none",
    transition: "transform 0.2s ease, border-color 0.2s ease"
  },
  whatsappCard: {
    border: "1px solid rgba(37, 211, 102, 0.3)",
    backgroundColor: "rgba(37, 211, 102, 0.1)"
  },
  iconCircle: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px"
  },
  label: {
    fontSize: "12px",
    color: "#94A3B8",
    fontWeight: "600",
    margin: 0
  },
  value: {
    fontSize: "15px",
    color: "#F8FAFC",
    fontWeight: "700",
    margin: "2px 0 0 0"
  }
};

export default Contact;