"use client";

import { useState, useEffect } from "react";

// 🔥 CARROSSEL
function Carrossel({ imagens, abrirGaleria }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [imagens.length]);

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
      onClick={() => abrirGaleria(imagens, index)}
    >
      <img src={imagens[index]} style={styles.image} />

      {/* CONTADOR */}
      <div style={styles.counter}>
        {index + 1}/{imagens.length}
      </div>

      {/* OVERLAY */}
      <div style={styles.overlay}>Ver fotos</div>

      {/* DOTS */}
      <div style={styles.dots}>
        {imagens.map((_, i) => (
          <span
            key={i}
            style={{
              ...styles.dot,
              background: i === index ? "#fff" : "#888",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// 🔥 GALERIA FULLSCREEN
function Galeria({ imagens, indexInicial, fechar }) {
  const [index, setIndex] = useState(indexInicial);

  return (
    <div style={styles.fullscreen}>
      <img src={imagens[index]} style={styles.fullImage} />

      <button onClick={fechar} style={styles.close}>X</button>

      <button onClick={() => setIndex((index - 1 + imagens.length) % imagens.length)} style={styles.prev}>‹</button>
      <button onClick={() => setIndex((index + 1) % imagens.length)} style={styles.next}>›</button>
    </div>
  );
}

// 🔥 PÁGINA
export default function Home() {
  const [start, setStart] = useState(false);
  const [galeria, setGaleria] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  function toggleFavorito(id) {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((f) => f !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  }

  function abrirGaleria(imagens, index) {
    setGaleria({ imagens, index });
  }

  if (!start) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <img src="/corretor.jpg" style={styles.avatar} />
          <h1>Seu Corretor</h1>
          <p>Imóveis selecionados para você 👇</p>

          <button onClick={() => setStart(true)} style={styles.button}>
            Ver imóveis
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={styles.list}>
        <h1 style={styles.title}>Imóveis</h1>

        {/* IMÓVEL 1 */}
        <div style={styles.item}>
          <Carrossel
            imagens={["/imovel1.jpg", "/imovel1-2.jpg", "/imovel1-3.jpg"]}
            abrirGaleria={abrirGaleria}
          />

          <button onClick={() => toggleFavorito(1)} style={styles.fav}>
            {favoritos.includes(1) ? "❤️" : "🤍"}
          </button>

          <h2>Apartamento 2 Dorms</h2>
          <p>Lazer completo + localização estratégica</p>
          <strong>R$ 320.000</strong>
        </div>

        {/* IMÓVEL 2 */}
        <div style={styles.item}>
          <Carrossel
            imagens={["/imovel2.jpg", "/imovel2-2.jpg", "/imovel2-3.jpg"]}
            abrirGaleria={abrirGaleria}
          />

          <button onClick={() => toggleFavorito(2)} style={styles.fav}>
            {favoritos.includes(2) ? "❤️" : "🤍"}
          </button>

          <h2>Apartamento 3 Dorms</h2>
          <p>Varanda gourmet + vaga coberta</p>
          <strong>R$ 450.000</strong>
        </div>
      </div>

      {/* WHATS FIXO */}
      <a href="https://wa.me/5511993374417" target="_blank" style={styles.whatsFloat}>
        WhatsApp
      </a>

      {/* GALERIA */}
      {galeria && (
        <Galeria
          imagens={galeria.imagens}
          indexInicial={galeria.index}
          fechar={() => setGaleria(null)}
        />
      )}
    </>
  );
}

// 🎨 ESTILO
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
  },
  avatar: {
    width: 100,
    borderRadius: "50%",
  },
  button: {
    marginTop: 15,
    padding: 12,
    width: "100%",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 10,
  },
  list: {
    padding: 20,
  },
  title: {
    textAlign: "center",
  },
  item: {
    background: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
    position: "relative",
  },
  carousel: {
    position: "relative",
  },
  image: {
    width: "100%",
    borderRadius: 12,
  },
  counter: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "#000",
    color: "#fff",
    padding: "3px 8px",
    borderRadius: 8,
    fontSize: 12,
  },
  overlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: 8,
    fontSize: 12,
  },
  dots: {
    display: "flex",
    justifyContent: "center",
    marginTop: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    margin: "0 3px",
  },
  fav: {
    position: "absolute",
    top: 10,
    left: 10,
    background: "#fff",
    border: "none",
    borderRadius: "50%",
    padding: 8,
    fontSize: 18,
  },
  whatsFloat: {
    position: "fixed",
    bottom: 20,
    right: 20,
    background: "#25D366",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: 30,
    textDecoration: "none",
    fontWeight: "bold",
  },
  fullscreen: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  fullImage: {
    width: "100%",
  },
  close: {
    position: "absolute",
    top: 20,
    right: 20,
    background: "#fff",
    border: "none",
    padding: 10,
  },
  prev: {
    position: "absolute",
    left: 10,
    top: "50%",
    background: "#fff",
    border: "none",
    padding: 10,
  },
  next: {
    position: "absolute",
    right: 10,
    top: "50%",
    background: "#fff",
    border: "none",
    padding: 10,
  },
};
