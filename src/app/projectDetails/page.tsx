"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";

interface Projeto {
  id: number;
  clienteId: number; // Adicionamos o campo clienteId
  titulo: string;
  descricao: string;
  categoria: string;
  propostas: Proposta[];
}

interface Proposta {
  id: number;
  tempo: string;
  valor: number;
  freelancerHash: string;
}

export default function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const router = useRouter();

  const clienteId = 1; // Exemplo de ID do cliente logado

  useEffect(() => {
    const carregarProjetos = async () => {
      try {
        const response = await axios.get<Projeto[]>(
          "http://localhost:3000/projetos",
          {
            params: {
              clienteId: clienteId,
            },
          }
        );
        setProjetos(response.data);
      } catch (error) {
        console.error("Erro ao carregar projetos:", error);
      }
    };

    carregarProjetos();
  }, [clienteId]);

  function handleSelect(id: number) {
    router.push(`/projectDetails/${id}`);
  }

  return (
    <div>
      <h1>Meus Projetos</h1>
      <ul>
        {projetos.map((projeto) => (
          <>
            <li key={projeto.id}>
              <h2>
                <strong>Título:</strong>Título: {projeto.titulo}
              </h2>
              <p>
                <strong>Descrição:</strong> {projeto.descricao}
              </p>
              <p>
                <strong>Categoria:</strong> {projeto.categoria}
              </p>
              {/* Adicione aqui um botão para ver detalhes do projeto */}
            </li>
            <button onClick={() => handleSelect(projeto.id)}>
              Propostas
            </button>
            <br />
            <br />
          </>
        ))}
      </ul>
    </div>
  );
}
