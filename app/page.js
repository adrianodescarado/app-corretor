"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [start, setStart] = useState(false);
  const [index, setIndex] = useState([0, 0]);
  const [pessoas, setPessoas] = useState([8, 6]);

  const startX = useRef(0);

  const imagens = [
    ["/imovel1-1.jpg", "/imovel1-2.jpg", "/imovel1-3.jpg"],
    ["/imovel2-1.jpg", "/imovel2-2.jpg", "/imovel2-3.jpg"],
  ];

  /* AUTOPLAY */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev.map((i, idx) => (i + 1) % imagens[idx].length)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ESCASSEZ */
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

  function handleTouchStart(e) {
    startX.current = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e, i) {
    let endX = e.changedTouches[0].screenX;

    setIndex((prev) => {
      const novo = [...prev];

      if (startX.current > endX) {
        novo[i]++;
      } else {
        novo[i]--;
      }

      if (novo[i] < 0) novo[i] = imagens[i].length - 1;
      if (novo[i] >= imagens[i].length) novo[i] = 0;

      return novo;
    });
  }

  if (!start) {
    return (
      <div style={styles.hero}>
        <div style={styles.card}>
          <img src="/corretor.jpg" style={styles.avatar} />
          <h2>Encontre seu imóvel ideal</h2>
          <p>Selecionamos as melhores oportunidades 👇</p>
          <p>⭐ +120 clientes atendidos</p>

          <button style={styles.btn} onClick={() => setStart(true)}>
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
          <div
            style={styles.carousel}
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(e, i)}
          >
            <img
              src={imagens[i][index[i]]}
              style={styles.img}
            />

            <div style={styles.dots}>
              {imagens[i].map((_, idx) => (
                <span
                  key={idx}
                  style={{
                    ...styles.dot,
                    opacity: idx === index[i] ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>

          <div style={styles.info}>
            <h3>{i === 0 ? "Casa moderna" : "Apartamento"}</h3>
            <p>💰 {i === 0 ? "R$ 250.000" : "R$ 180.000"}</p>
            <p>👀 {pessoas[i]} pessoas vendo agora</p>

            <a
              style={styles.whats}
              href="https://wa.me/5511999999999?text=Tenho%20interesse%20no%20imóvel"
              target="_blank"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  hero: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    cursor: "pointer",
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
