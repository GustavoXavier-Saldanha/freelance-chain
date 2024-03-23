/*
"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
*/
import Home from "./home";


export default function Page() {
  /*const [nome, setNome] = useState<string>("");
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
   */

  return (
    <div>
    <Home />
  </div>
  );
}
