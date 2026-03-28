"use client";

import { useState } from "react";

function Carrossel({ imagens }) {
  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((index - 1 + imagens.length) % imagens.length);
  }

  function next() {
    setIndex((index + 1) % imagens.length);
  }

  return (
    <div style={styles.carousel}>
      <img src={imagens[index]} style={styles.image} />

      <button onClick={prev} style={styles.prev}>‹</button>
      <button onClick={next} style={styles.next}>›</button>
    </div>
  );
}

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

      <div style={styles.item}>
        <Carrossel imagens={["/imovel1.jpg", "/imovel2.jpg", "/imovel3.jpg"]} />
        <h2>Apartamento 2 Dorms</h2>
        <p>Lazer completo + ótima localização</p>
        <strong>R$ 320.000</strong>

        <a href="https://wa.me/5511993374417" target="_blank">
          <button style={styles.whatsapp}>Falar no WhatsApp</button>
        </a>
      </div>

      <div style={styles.item}>
        <Carrossel imagens={["/imovel2.jpg", "/imovel3.jpg", "/imovel1.jpg"]} />
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
  prev: {
    position: "absolute",
    top: "50%",
    left: 10,
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
  next: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
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
