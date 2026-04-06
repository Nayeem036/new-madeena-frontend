import React from "react";

const Menu = () => {
  const menuItems = [
    {
      name: "Chicken Biryani",
      image:
        "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/chicken-biryani.jpg",
    },
    {
      name: "Mutton Biryani",
      image:
        "https://www.cubesnjuliennes.com/wp-content/uploads/2021/02/Best-Mutton-Biryani-Recipe.jpg",
    },
    {
      name: "Chicken 65",
      image:
        "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/12/chicken-65-recipe.jpg",
    },
    {
      name: "Feerni",
      image:
        "https://www.vegrecipesofindia.com/wp-content/uploads/2021/08/phirni-recipe-1.jpg",
    },
    {
      name: "Gajar Halwa (Carrot Halwa)",
      image:
        "https://www.vegrecipesofindia.com/wp-content/uploads/2020/12/gajar-halwa-recipe-1.jpg",
    },
    {
      name: "Pumpkin Halwa",
      image:
        "https://www.vegrecipesofindia.com/wp-content/uploads/2021/09/kaddu-ka-halwa.jpg",
    },
  ];

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  };

  const cardStyle = {
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    backgroundColor: "#fff",
    textAlign: "center",
    transition: "transform 0.3s ease",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  };

  const nameStyle = {
    padding: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      {menuItems.map((item, index) => (
        <div
          key={index}
          style={{
            ...cardStyle,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.03)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          <img src={item.image} alt={item.name} style={imageStyle} />
          <div style={nameStyle}>{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
