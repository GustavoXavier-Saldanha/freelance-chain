"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Projeto {
  id: number;
  clienteId: number;
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

export default function ProjectsDetail({
  params,
}: {
  params: { productId: string };
}) {
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const router = useRouter();
  const id = params.productId;

  useEffect(() => {
    // Carrega os detalhes do projeto do servidor (JSON Server) quando o componente é montado
    const carregarProjeto = async () => {
      try {
        const response = await axios.get<Projeto[]>(
          `http://localhost:3000/projetos`,
          {
            params: {
              id: id,
            },
          }
        );
        setProjeto(response.data[0]);
      } catch (error) {
        console.error("Erro ao carregar projeto:", error);
      }
    };

    if (id) {
      carregarProjeto();
    }
  }, [id]);
  console.log(projeto && projeto);
  return (
    <div>
      {projeto ? (
        <>
          <h1>{projeto.titulo}</h1>
          <p>{projeto.descricao}</p>
          <p>Categoria: {projeto.categoria}</p>

          <h2>Propostas Recebidas:</h2>
          <br />
          <br />
          <ul>
            {projeto.propostas &&
              projeto.propostas.map((proposta) => (
                <>
                  <li key={proposta.id}>
                    <p>Tempo Estimado: {proposta.tempo}</p>
                    <p>Valor: ${proposta.valor}</p>
                    <p>Freelancer Hash: {proposta.freelancerHash}</p>

                    {/* Adicione aqui detalhes adicionais sobre a proposta, se necessário */}
                  </li>
                  <br />
                  <br />
                </>
              ))}
          </ul>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
