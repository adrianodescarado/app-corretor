"use client";

import { useState, useEffect } from "react";

// 🔥 CARROSSEL COMPLETO (SWIPE + AUTOPLAY + BOLINHAS)
function Carrossel({ imagens }) {
  const [index, setIndex] = useState(0);

  // 👉 AUTOPLAY
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [imagens.length]);

  // 👉 SWIPE
  let startX = 0;

  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      setIndex((prev) => (prev + 1) % imagens.length);
    }

    if (endX - startX > 50) {
      setIndex((prev) => (prev - 1 + imagens.length) % imagens.length);
    }
  }

  return (
    <div
      style={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img src={imagens[index]} style={styles.image} />

      {/* 👉 BOLINHAS */}
      <div style={styles.dots}>
        {imagens.map((_, i) => (
          <span
            key={i}
            style={{
              ...styles.dot,
              background: i === index ? "#000" : "#ccc",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// 🔥 PÁGINA PRINCIPAL
export default function Home() {
  const [start, setStart] = useState(false);

  if (!start) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <img src="/corretor.jpg" style={styles.avatar} />

          <h1>Seu Corretor</h1>
          <p>Separei esses imóveis para você 👇</p>

          <button onClick={() => setStart(true)} style={styles.button}>
            Iniciar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.list}>
      <h1 style={{ textAlign: "center" }}>Imóveis Selecionados</h1>

      {/* 🏠 IMÓVEL 1 */}
      <div style={styles.item}>
        <Carrossel
          imagens={[
            "/imovel1.jpg",
            "/imovel1-2.jpg",
            "/imovel1-3.jpg",
          ]}
        />
        <h2>Apartamento 2 Dorms</h2>
        <p>Lazer completo + ótima localização</p>
        <strong>R$ 320.000</strong>

        <a href="https://wa.me/5511993374417" target="_blank">
          <button style={styles.whatsapp}>Falar no WhatsApp</button>
        </a>
      </div>

      {/* 🏠 IMÓVEL 2 */}
      <div style={styles.item}>
        <Carrossel
          imagens={[
            "/imovel2.jpg",
            "/imovel2-2.jpg",
            "/imovel2-3.jpg",
          ]}
        />
        <h2>Apartamento 3 Dorms</h2>
        <p>Varanda gourmet + vaga coberta</p>
        <strong>R$ 450.000</strong>

        <a href="https://wa.me/5511999999999" target="_blank">
          <button style={styles.whatsapp}>Falar no WhatsApp</button>
        </a>
      </div>
    </div>
  );
}

// 🎨 ESTILOS
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    textAlign: "center",
    width: 300,
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    padding: 12,
    width: "100%",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
  },
  list: {
    padding: 20,
    background: "#f5f5f5",
    minHeight: "100vh",
  },
  item: {
    background: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
    boxShadow: "0 5px 10px rgba(0,0,0,0.05)",
  },
  image: {
    width: "100%",
    borderRadius: 12,
    marginBottom: 10,
  },
  carousel: {
    position: "relative",
  },

  // 👉 BOLINHAS
  dots: {
    display: "flex",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    margin: "0 4px",
  },

  whatsapp: {
    marginTop: 10,
    width: "100%",
    padding: 12,
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
  },
};
