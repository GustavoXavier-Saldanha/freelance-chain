"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [carteiraHash, setCarteiraHash] = useState<string>("");

  const handleCadastro = async () => {
    try {
      await axios.post("http://localhost:3000/clientes", {
        nome,
        email,
        carteiraHash,
      });

      //router.push('/dashboard');
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
    }
  };

  return (
    <div>
      <h1>Cadastro de Cliente</h1>
      <form onSubmit={handleCadastro}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Hash da Carteira:
          <input
            type="text"
            value={carteiraHash}
            onChange={(e) => setCarteiraHash(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
