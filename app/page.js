"use client";

import { useState, useEffect } from "react";

/* 🔥 CARROSSEL */
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

    if (startX - endX > 50) setIndex((p) => (p + 1) % imagens.length);
    if (endX - startX > 50) setIndex((p) => (p - 1 + imagens.length) % imagens.length);
  }

  return (
    <div
      style={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => abrirGaleria(imagens, index)}
    >
      <img src={imagens[index]} style={styles.image} />

      <div style={styles.counter}>
        {index + 1}/{imagens.length}
      </div>

      <div style={styles.overlay}>Ver fotos</div>
    </div>
  );
}

/* ❤️ FAVORITO */
function Favorito() {
  const [ativo, setAtivo] = useState(false);

  return (
    <div
      onClick={() => setAtivo(!ativo)}
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        fontSize: 22,
        cursor: "pointer",
        transform: ativo ? "scale(1.2)" : "scale(1)",
        transition: "0.2s",
      }}
    >
      {ativo ? "❤️" : "🤍"}
    </div>
  );
}

/* 🔥 GALERIA */
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

/* 🔥 FORM */
function Formulario({ imovel, fechar }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  function enviar() {
    const msg = `Olá, sou ${nome}, telefone ${telefone}. Interesse no ${imovel}`;
    window.open(`https://wa.me/5511993374417?text=${encodeURIComponent(msg)}`);
  }

  return (
    <div style={styles.modal}>
      <div style={styles.modalBox}>
        <h3>Falar com corretor</h3>

        <input placeholder="Seu nome" onChange={(e) => setNome(e.target.value)} style={styles.input} />
        <input placeholder="Seu telefone" onChange={(e) => setTelefone(e.target.value)} style={styles.input} />

        <button onClick={enviar} style={styles.whatsapp}>Enviar</button>
        <button onClick={fechar} style={styles.closeBtn}>Cancelar</button>
      </div>
    </div>
  );
}

/* 🔥 APP */
export default function Home() {
  const [start, setStart] = useState(false);
  const [galeria, setGaleria] = useState(null);
  const [modal, setModal] = useState(null);

  function abrirGaleria(imagens, index) {
    setGaleria({ imagens, index });
  }

  if (!start) {
    return (
      <div style={styles.hero}>
        <div style={styles.card}>
          <img src="/corretor.jpg" style={styles.avatar} />

          <h1 style={{ marginTop: 10 }}>Seu Corretor de Confiança</h1>
          <p>Encontrei oportunidades exclusivas pra você 👇</p>

          <div style={styles.badge}>
            ⭐ +120 clientes atendidos com sucesso
          </div>

          <button onClick={() => setStart(true)} style={styles.button}>
            Ver imóveis disponíveis
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={styles.list}>
        <h1 style={styles.title}>Imóveis disponíveis</h1>

        {/* IMÓVEL 1 */}
        <div style={styles.item}>
          <Favorito />
          <Carrossel
            imagens={["/imovel1.jpg", "/imovel1-2.jpg", "/imovel1-3.jpg"]}
            abrirGaleria={abrirGaleria}
          />

          <h2>Apartamento 2 Dorms</h2>
          <p>🔥 Últimas unidades | 👀 Alta procura</p>
          <strong>R$ 320.000</strong>

          <button onClick={() => setModal("Ap 2 Dorms")} style={styles.whatsapp}>
            Falar com corretor
          </button>
        </div>

        {/* IMÓVEL 2 */}
        <div style={styles.item}>
          <Favorito />
          <Carrossel
            imagens={["/imovel2.jpg", "/imovel2-2.jpg", "/imovel2-3.jpg"]}
            abrirGaleria={abrirGaleria}
          />

          <h2>Apartamento 3 Dorms</h2>
          <p>🔥 Alta procura | 👀 Muitas visitas</p>
          <strong>R$ 450.000</strong>

          <button onClick={() => setModal("Ap 3 Dorms")} style={styles.whatsapp}>
            Falar com corretor
          </button>
        </div>
      </div>

      {modal && <Formulario imovel={modal} fechar={() => setModal(null)} />}
      {galeria && <Galeria imagens={galeria.imagens} indexInicial={galeria.index} fechar={() => setGaleria(null)} />}
    </>
  );
}

/* 🎨 ESTILO */
const styles = {
  hero: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,#f0f4ff,#ffffff)",
  },

  card: {
    background: "#fff",
    padding: 25,
    borderRadius: 20,
    width: 320,
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    animation: "fade 1s ease",
  },

  avatar: {
    width: 100,
    borderRadius: "50%",
  },

  badge: {
    marginTop: 10,
    background: "#f5f5f5",
    padding: 8,
    borderRadius: 10,
    fontSize: 13,
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

  list: { padding: 20 },

  title: { textAlign: "center" },

  item: {
    background: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
    position: "relative",
  },

  carousel: { position: "relative" },

  image: { width: "100%", borderRadius: 12 },

  counter: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "#000",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: 8,
  },

  overlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: 8,
  },

  whatsapp: {
    marginTop: 10,
    width: "100%",
    padding: 12,
    background: "#25D366",
    color: "#fff",
    border: "none",
    borderRadius: 10,
  },

  fullscreen: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  fullImage: { width: "100%" },

  close: { position: "absolute", top: 20, right: 20 },
  prev: { position: "absolute", left: 10, top: "50%" },
  next: { position: "absolute", right: 10, top: "50%" },

  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 300,
  },

  input: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
  },

  closeBtn: {
    marginTop: 10,
    width: "100%",
  },
};
