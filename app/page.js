"use client";

import { useState } from "react";

export default function Home() {
  const [start, setStart] = useState(false);

  if (!start) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h1>Bem-vindo!</h1>
        <p>Veja os imóveis que separei para você</p>

        <button onClick={() => setStart(true)}>
          Iniciar
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Imóveis</h1>

      <div>
        <h2>Apartamento 2 Dorms</h2>
        <p>R$ 320.000</p>

        <a href="https://wa.me/5511999999999" target="_blank">
          WhatsApp
        </a>
      </div>
    </div>
  );
}
