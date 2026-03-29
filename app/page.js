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

      <div style={styles.dots}>
        {imagens.map((_, i) => (
          <span key={i} style={{ ...styles.dot, background: i === index ? "#fff" : "#888" }} />
        ))}
      </div>
    </div>
  );
}

// 🔥 GALERIA
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

// 🔥 APP
export default function Home() {
  const [start, setStart] = useState(false);
  const [galeria, setGaleria] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [form, setForm] = useState({ nome: "", telefone: "" });

  useEffect(() => {
    const saved = localStorage.getItem("favoritos");
    if (saved) setFavoritos(JSON.parse(saved));
  }, []);

  function toggleFavorito(id) {
    let novaLista;
    if (favoritos.includes(id)) {
      novaLista = favoritos.filter((f) => f !== id);
    } else {
      novaLista = [...favoritos, id];
    }
    setFavoritos(novaLista);
    localStorage.setItem("favoritos", JSON.stringify(novaLista));
  }

  function abrirGaleria(imagens, index) {
    setGaleria({ imagens, index });
  }

  function enviarLead(imovel) {
    const mensagem = `Olá, sou ${form.nome}. Tenho interesse no ${imovel}`;
    window.open(`https://wa.me/5511993374417?text=${encodeURIComponent(mensagem)}`);
  }

  if (!start) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <img src="/corretor.jpg" style={styles.avatar} />
          <h1>Corretor Viola</h1>
          <p>Imóveis selecionados pra você 👇</p>

          <input
            placeholder="Seu nome"
            style={styles.input}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />

          <input
            placeholder="Seu telefone"
            style={styles.input}
            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
          />

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
        <h1 style={styles.title}>Imóveis disponíveis</h1>

        {/* IMÓVEL */}
        <div style={styles.item}>
          <Carrossel
            imagens={["/imovel1.jpg", "/imovel1-2.jpg", "/imovel1-3.jpg"]}
            abrirGaleria={abrirGaleria}
          />

          <button onClick={() => toggleFavorito(1)} style={styles.fav}>
            {favoritos.includes(1) ? "❤️" : "🤍"}
          </button>

          <h2>Apartamento 2 Dorms</h2>
          <p>🔥 Últimas unidades | 👀 12 pessoas vendo</p>
          <p>Lazer completo + ótima localização</p>

          <a href="https://www.google.com/maps?q=itaquaquecetuba" target="_blank">
            <button style={styles.map}>Ver localização</button>
          </a>

          <strong>R$ 320.000</strong>

          <button onClick={() => enviarLead("Apartamento 2 Dorms - R$320.000")} style={styles.whatsapp}>
            Falar com corretor agora
          </button>
        </div>

        {/* PROVA SOCIAL */}
        <div style={styles.social}>
          ⭐⭐⭐⭐⭐ Mais de 120 clientes atendidos com sucesso
        </div>
      </div>

      {/* BOTÃO FIXO */}
      <a href="https://wa.me/5511993374417?text=Tenho interesse em um imóvel" target="_blank" style={styles.whatsFloat}>
        Falar agora
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
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" },
  card: { background: "#fff", padding: 20, borderRadius: 16, width: 300, textAlign: "center" },
  avatar: { width: 100, borderRadius: "50%" },
  input: { width: "100%", padding: 10, marginTop: 10, borderRadius: 8, border: "1px solid #ccc" },
  button: { marginTop: 10, padding: 12, width: "100%", background: "#0070f3", color: "#fff", border: "none", borderRadius: 10 },

  list: { padding: 20 },
  title: { textAlign: "center" },

  item: { background: "#fff", padding: 15, borderRadius: 16, marginBottom: 20, position: "relative" },

  carousel: { position: "relative" },
  image: { width: "100%", borderRadius: 12 },
  counter: { position: "absolute", top: 10, right: 10, background: "#000", color: "#fff", padding: "4px 8px", borderRadius: 8 },
  overlay: { position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.5)", color: "#fff", padding: "5px 10px", borderRadius: 8 },

  dots: { display: "flex", justifyContent: "center", marginTop: 6 },
  dot: { width: 6, height: 6, borderRadius: "50%", margin: "0 3px" },

  fav: { position: "absolute", top: 10, left: 10, background: "#fff", border: "none", borderRadius: "50%", padding: 8 },

  map: { marginTop: 8, padding: 10, width: "100%", borderRadius: 10 },

  whatsapp: { marginTop: 10, width: "100%", padding: 12, background: "#25D366", color: "#fff", border: "none", borderRadius: 10 },

  social: { textAlign: "center", marginTop: 20 },

  whatsFloat: {
    position: "fixed",
    bottom: 20,
    right: 20,
    background: "#25D366",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: 30,
    textDecoration: "none",
  },

  fullscreen: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#000", display: "flex", justifyContent: "center", alignItems: "center" },
  fullImage: { width: "100%" },
  close: { position: "absolute", top: 20, right: 20, background: "#fff", border: "none" },
  prev: { position: "absolute", left: 10, top: "50%", background: "#fff", border: "none" },
  next: { position: "absolute", right: 10, top: "50%", background: "#fff", border: "none" },
};
