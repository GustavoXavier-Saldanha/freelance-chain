"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ethers } from "ethers";
import ContratoFreelancer from "../../contracts/ContratoFreelancer.sol";

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

  const finalizarContrato = async () => {
    try {
      // Conecte-se a uma carteira Ethereum
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.enable(); // Solicite permissão ao usuário para conectar a carteira

      // Obtenha a instância do contrato inteligente
      const contrato = new ethers.Contract(
        ContratoFreelancer.address,
        ContratoFreelancer.abi,
        provider.getSigner()
      );

      // Chame a função finalizarContrato no contrato
      const tx = await contrato.finalizarContrato();
      await tx.wait(); // Aguarde a transação ser confirmada

      console.log("Contrato finalizado com sucesso!");
    } catch (error) {
      console.error("Erro ao finalizar contrato:", error);
    }
  };

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
                    <button
                      onClick={() =>
                        finalizarContrato(proposta.freelancerHash)
                      }>
                      Finalizar Contrato
                    </button>
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
