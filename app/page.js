"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [start, setStart] = useState(false);

  /* ESCASSEZ */
  const [pessoas, setPessoas] = useState([8, 6]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPessoas((prev) =>
        prev.map((p) => {
          let novo = p + (Math.random() > 0.5 ? 1 : -1);
          if (novo < 5) novo = 5;
          if (novo > 15) novo = 15;
          return novo;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  /* CARROSSEL */
  const [index, setIndex] = useState([0, 0]);
  const [touchStart, setTouchStart] = useState(0);

  const images = [
    ["/imovel1-1.jpg", "/imovel1-2.jpg", "/imovel1-3.jpg"],
    ["/imovel2-1.jpg", "/imovel2-2.jpg", "/imovel2-3.jpg"],
  ];

  const next = (i) => {
    setIndex((prev) =>
      prev.map((v, idx) =>
        idx === i ? (v + 1) % images[i].length : v
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next(0);
      next(1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e, i) => {
    const end = e.changedTouches[0].clientX;

    if (touchStart > end) next(i);
    else
      setIndex((prev) =>
        prev.map((v, idx) =>
          idx === i
            ? v === 0
              ? images[i].length - 1
              : v - 1
            : v
        )
      );
  };

  /* TELA INICIAL */
  if (!start) {
    return (
      <div style={styles.hero}>
        <div style={styles.card}>
          <img src="/corretor.jpg" style={styles.avatar} />

          <h2>Encontre seu imóvel ideal</h2>
          <p>Selecionamos as melhores oportunidades 👇</p>

          <div style={styles.badge}>
            ⭐ +120 clientes atendidos
          </div>

          <button onClick={() => setStart(true)} style={styles.btn}>
            Ver imóveis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {[0, 1].map((i) => (
        <div key={i} style={styles.imovel}>
          
          {/* CARROSSEL */}
          <div
            style={styles.carousel}
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(e, i)}
          >
            {images[i].map((img, idx) => (
              <img
                key={idx}
                src={img}
                style={{
                  ...styles.img,
                  display: index[i] === idx ? "block" : "none",
                }}
              />
            ))}

            {/* BOLINHAS */}
            <div style={styles.dots}>
              {images[i].map((_, d) => (
                <span
                  key={d}
                  style={{
                    ...styles.dot,
                    opacity: index[i] === d ? 1 : 0.4,
                  }}
                />
              ))}
            </div>
          </div>

          {/* INFO */}
          <div style={styles.info}>
            <h3>{i === 0 ? "Casa moderna" : "Apartamento"}</h3>
            <p>💰 {i === 0 ? "R$ 250.000" : "R$ 180.000"}</p>

            <p>
              🔥 Últimas unidades | 👀 {pessoas[i]} pessoas vendo agora
            </p>

            <a style={styles.whats} href="#">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ESTILO */
const styles = {
  hero: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f2f2f2",
  },

  card: {
    background: "linear-gradient(135deg,#fff,#eef3ff)",
    padding: 30,
    borderRadius: 20,
    textAlign: "center",
    width: 320,
    boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    border: "3px solid #0070f3",
    objectFit: "cover",
  },

  badge: {
    marginTop: 10,
    background: "#fff",
    padding: 8,
    borderRadius: 10,
    fontSize: 13,
  },

  btn: {
    marginTop: 20,
    padding: 15,
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    width: "100%",
    fontWeight: "bold",
  },

  container: {
    padding: 20,
    background: "#f2f2f2",
  },

  imovel: {
    background: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  carousel: {
    position: "relative",
  },

  img: {
    width: "100%",
  },

  dots: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    textAlign: "center",
  },

  dot: {
    height: 8,
    width: 8,
    margin: 3,
    background: "#fff",
    borderRadius: "50%",
    display: "inline-block",
  },

  info: {
    padding: 15,
  },

  whats: {
    display: "block",
    marginTop: 10,
    background: "green",
    color: "#fff",
    textAlign: "center",
    padding: 12,
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: "bold",
  },
};
