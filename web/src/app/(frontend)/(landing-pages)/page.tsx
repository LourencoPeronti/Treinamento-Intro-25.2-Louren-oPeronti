"use client";
import LandingPagesNav from "@/components/nav/InitialNav";
import Embarcar from "./Embarcar";
import { auth } from "@/auth";
import ProdutoCard from "@/components/produtoCard/produtoCard";
import { useState } from "react";




export default function Home() {
  const [produto, setProduto] = useState([{
        id: "0",
        nome: "Poção Anti-DP",
        preco: "R$2000,00",
        descricao: "Tome e fique imune de DPs para SEMPRE",
        img: "pocao-removebg-preview.png",
        isOnCarrinho: false
    },
    {
        id: "1",
        nome: "Óculos Vetorial",
        preco: "R$1550,39",
        descricao: "Dificuldade em vizualizar os vetores em AlgLin? Este óculos permite vizualizá-los no espaço bem na sua frente",
        img: "oculos_vetorial.png",
        isOnCarrinho: false
    },
    {
        id: "2",
        nome: "Relógio Dobrado",
        preco: "R$10.000,99",
        descricao: "Não consegue fazer tudo em 24h? Não se preocupe, este relógio deixa seu dia com 48h (Talvez ainda não seja suficiente para o politécnico). Bem melhor que um Rolex",
        img: "relogio.png",
        isOnCarrinho: false
    },
    {
        id: "3",
        nome: "Arma encolhedora",
        preco: "R$956,75",
        descricao: "Dificuldade em entender defeitos cristalinos e estruturas atômicas? Com esta arma, você poderá ficar do tamanho de um átomo e entendê-las de uma ves por todas.",
        img: "arma-removebg-preview.png",
        isOnCarrinho: false
    }])

    const produtosCarrinho = produto.filter((produto)=>produto.isOnCarrinho)
    const [modal, setModal] = useState(false)
    
    function openModal(){
      setModal(!modal)
      //console.log("modal: " + modal)
    }
    function adicionaCarrinho(id: string){
      setProduto((antProduto) =>
      antProduto.map((produto) =>
      produto.id === id
        ? { ...produto, isOnCarrinho: !produto.isOnCarrinho }
        : produto 
    )
  );
  }
  return (
    <div>
      <LandingPagesNav
      abrirModal={openModal}
      produtosCarrinho={produtosCarrinho}
      />
      <div className="grid [grid-template-columns:repeat(auto-fit,_300px)] w-screen gap-[70px] p-[30px] justify-center">
        {produto.map((item)=>(
          <ProdutoCard 
          produto={item}
          key={item.id} 
          adicionaCarrinho={adicionaCarrinho}
          />
        ))}
        
      </div>
      {modal == false? null : 
      <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
        <div className="flex flex-col bg-blue-100 w-100 h-auto  rounded-lg shadow-lg border-[4px] border-[#94ADD2] max-h-[40vh] overflow-y-auto">
        <div className="flex flex-row justify-between border-b-2 w-[100%] p-3">
          <p className="text-2xl font-sans font-bold">Carrinho</p>
          <button onClick={openModal} className="border h-7 w-7 rounded-full hover: cursor-pointer">
            <p>X</p>
          </button>
        </div>
        <div>
          {produtosCarrinho.map((produto) => (
            <div key = {produto.id} className="flex flex-row justify-between border-b-2 border-[#94ADD2] p-3">
              <p>{produto.nome}</p>
              <p className="font-bold">{produto.preco}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
      
      }
    
    </div>
      
  ); 
}