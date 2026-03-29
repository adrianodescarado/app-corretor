"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [start, setStart] = useState(false);
  const [modal, setModal] = useState(null);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const [favoritos, setFavoritos] = useState([false, false]);
  const [indexImg, setIndexImg] = useState([0, 0]);

  const imagens = [
    ["/imovel1-1.jpg", "/imovel1-2.jpg", "/imovel1-3.jpg"],
    ["/imovel2-1.jpg", "/imovel2-2.jpg", "/imovel2-3.jpg"],
  ];

  const [pessoas, setPessoas] = useState([12, 8]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPessoas((prev) =>
        prev.map((p) => {
          let novo = p + (Math.random() > 0.5 ? 1 : -1);
          if (novo < 5) novo = 5;
          if (novo > 20) novo = 20;
          return novo;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexImg((prev) =>
        prev.map((i, idx) => (i + 1) % imagens[idx].length)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function toggleFavorito(i) {
    const novos = [...favoritos];
    novos[i] = !novos[i];
    setFavoritos(novos);
  }

  function enviarWhatsApp() {
    const texto = `Olá! Tenho interesse no imóvel: ${modal}%0A Nome: ${nome}%0A Telefone: ${telefone}`;
    window.open(`https://wa.me/5511999999999?text=${texto}`);
  }

  if (!start) {
    return (
      <div style={styles.hero}>
        <div style={styles.card}>
          <img src="/corretor.jpg" style={styles.avatar} />
          <h1>Encontre seu imóvel ideal</h1>
          <p>Oportunidades com alta procura 👇</p>

          <div style={styles.badge}>
            ⭐ +120 clientes atendidos
          </div>

          <button onClick={() => setStart(true)} style={styles.button}>
            Ver imóveis
          </button>

          <p style={{ fontSize: 12 }}>🔥 Atualizado agora</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {[0, 1].map((i) => (
        <div key={i} style={styles.imovel}>
          <div style={styles.carousel}>
            <img
              src={imagens[i][indexImg[i]]}
              style={styles.img}
            />

            <div style={styles.bolinhas}>
              {imagens[i].map((_, idx) => (
                <span
                  key={idx}
                  style={{
                    ...styles.bolinha,
                    opacity: idx === indexImg[i] ? 1 : 0.3,
                  }}
                />
              ))}
            </div>

            <div
              style={styles.coracao}
              onClick={() => toggleFavorito(i)}
            >
              {favoritos[i] ? "❤️" : "🤍"}
            </div>
          </div>

          <h2>{i === 0 ? "Ap 2 Dorms" : "Casa com suíte"}</h2>

          <p>
            🔥 {i === 0 ? "Últimas unidades" : "Alta procura"} | 👀{" "}
            {pessoas[i]} pessoas vendo agora
          </p>

          <button
            onClick={() =>
              setModal(i === 0 ? "Ap 2 Dorms" : "Casa com suíte")
            }
            style={styles.button}
          >
            Falar no WhatsApp
          </button>
        </div>
      ))}

      <div style={styles.depoimento}>
        <p>
          “Consegui meu apê em 3 dias! Atendimento rápido demais.”
        </p>
        <strong>- Cliente satisfeito</strong>
      </div>

      {/* BOTÃO FLUTUANTE */}
      <a
        href="https://wa.me/5511999999999"
        style={styles.floating}
      >
        💬
      </a>

      {/* MODAL */}
      {modal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Preencha para continuar</h3>

            <input
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={styles.input}
            />

            <input
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              style={styles.input}
            />

            <button onClick={enviarWhatsApp} style={styles.button}>
              Continuar no WhatsApp
            </button>

            <button onClick={() => setModal(null)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: 20 },

  hero: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    textAlign: "center",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },

  avatar: {
    width: 80,
    borderRadius: "50%",
  },

  badge: {
    background: "#eee",
    padding: 5,
    margin: 10,
    borderRadius: 5,
  },

  imovel: {
    marginBottom: 40,
    borderBottom: "1px solid #ccc",
    paddingBottom: 20,
  },

  carousel: {
    position: "relative",
  },

  img: {
    width: "100%",
    borderRadius: 10,
  },

  bolinhas: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 5,
  },

  bolinha: {
    width: 8,
    height: 8,
    background: "#fff",
    borderRadius: "50%",
  },

  coracao: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 24,
    cursor: "pointer",
  },

  button: {
    padding: 10,
    marginTop: 10,
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,112,243,0.4)",
  },

  depoimento: {
    marginTop: 30,
    padding: 20,
    background: "#f5f5f5",
    borderRadius: 10,
    textAlign: "center",
  },

  floating: {
    position: "fixed",
    bottom: 20,
    right: 20,
    background: "green",
    color: "#fff",
    padding: 15,
    borderRadius: "50%",
    textDecoration: "none",
  },

  overlay: {
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

  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
  },

  input: {
    display: "block",
    marginBottom: 10,
    padding: 10,
    width: "100%",
  },
};
