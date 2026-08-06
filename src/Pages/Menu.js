import React from "react";

function Menu() {
  const menuItems = [
    {
      id: 1,
      name: "Chicken Biryani",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Mutton Biryani",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Chicken 65",
      image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Feerni",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Gajar Halwa (Carrot Halwa)",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Pumpkin Halwa",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.headerArea}>
          <span style={styles.badge}>Our Culinary Selection</span>
          <h1 style={styles.title}>Menu & Specialties</h1>
          <p style={styles.subtitle}>Handcrafted dishes prepared with authentic ingredients</p>
        </div>

        <div style={styles.grid}>
          {menuItems.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={styles.imageContainer}>
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop";
                  }}
                  style={styles.image}
                />
              </div>
              <div style={styles.cardBody}>
                <h3 style={styles.itemName}>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "calc(100vh - 70px)",
    padding: "40px 20px",
    background: "radial-gradient(circle at top, #1E293B 0%, #0F172A 100%)"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto"
  },
  headerArea: {
    textAlign: "center",
    marginBottom: "40px"
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
    fontSize: "32px",
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: "8px"
  },
  subtitle: {
    fontSize: "15px",
    color: "#94A3B8"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px"
  },
  card: {
    backgroundColor: "rgba(30, 41, 59, 0.7)",
    backdropFilter: "blur(16px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  },
  imageContainer: {
    width: "100%",
    height: "200px",
    overflow: "hidden",
    backgroundColor: "rgba(15, 23, 42, 0.5)"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  cardBody: {
    padding: "20px",
    textAlign: "center"
  },
  itemName: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#F8FAFC",
    margin: 0
  }
};

export default Menu;