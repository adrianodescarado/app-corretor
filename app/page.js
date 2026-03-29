"use client";

import { useState, useEffect } from "react";

// 🔥 CARROSSEL PREMIUM
function Carrossel({ imagens }) {
  const [index, setIndex] = useState(0);

  // 👉 AUTOPLAY
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 3500);

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
      <img
        src={imagens[index]}
        style={{
          ...styles.image,
          opacity: 1,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* 🔢 CONTADOR */}
      <div style={styles.counter}>
        {index + 1}/{imagens.length}
      </div>

      {/* ⚫ BOLINHAS */}
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

// 🔥 PÁGINA
export default function Home() {
  const [start, setStart] = useState(false);

  if (!start) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <img src="/corretor.jpg" style={styles.avatar} />
          <h1>Seu Corretor</h1>
          <p>Separei imóveis exclusivos pra você 👇</p>

          <button onClick={() => setStart(true)} style={styles.button}>
            Ver imóveis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.list}>
      <h1 style={styles.title}>Imóveis Selecionados</h1>

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
        <p>Lazer completo + localização estratégica</p>
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

// 🎨 ESTILO PREMIUM
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
    padding: 25,
    borderRadius: 20,
    textAlign: "center",
    width: 320,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: 10,
  },

  button: {
    marginTop: 15,
    padding: 14,
    width: "100%",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontWeight: "bold",
    fontSize: 16,
  },

  list: {
    padding: 20,
    background: "#f5f5f5",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
  },

  item: {
    background: "#fff",
    padding: 15,
    borderRadius: 18,
    marginBottom: 20,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  carousel: {
    position: "relative",
  },

  image: {
    width: "100%",
    borderRadius: 14,
    marginBottom: 10,
  },

  counter: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: 8,
    fontSize: 12,
  },

  dots: {
    display: "flex",
    justifyContent: "center",
    marginTop: 6,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    margin: "0 4px",
  },

  whatsapp: {
    marginTop: 12,
    width: "100%",
    padding: 14,
    background: "#25D366",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontWeight: "bold",
    fontSize: 15,
  },
};
