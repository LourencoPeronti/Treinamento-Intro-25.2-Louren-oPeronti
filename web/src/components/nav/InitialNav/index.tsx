import Produto from "@/types/Produto";
import { Gorditas } from "next/font/google";
import "./navStyle.css"; // idealmente, toda a estilização deveria ser feita em tailwind por consistência

const gorditas = Gorditas({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gorditas",
});

interface Props {
  abrirModal: () => void;
  produtosCarrinho: Produto[];
}

function LandingPagesNav({abrirModal, produtosCarrinho}: Props) {
  return ( 
    <header className="${gorditas.variable} font-[var(--font-gorditas)] box-content border-b-2 border-[#BFD7EA] m-0 p-0">
        <div className="flex w-full max-w-full m-0 pl-10">
            <div className="h-[20vh] w-[60%] bg-[#E5ECF6] flex flex-row items-center px-4go">
                <img src="logo-removebg-preview.png" alt="img" className="h-1/2"/>
                <h1 className="font-extrabold text-3xl text-[#1A2B5F] ml-2">Comprou, Passou</h1>
            </div>
            <div className="w-[40%] bg-[#E5ECF6] flex flex-row justify-around items-center px-4">
                <div>
                    <p className="text-[#4A64A6]">Olá, <span className="ont-bold text-[#1A2B5F]">Lourenco</span></p>
                </div>
                <button className="flex flex-row items-center hover:cursor-pointer" onClick={abrirModal}>
                    <img src="carrinho.png" alt="imagem" className="h-10 w-10"/>
                    <p id="txt_carrinho" className="border-2 border-[#1A2B5F] bg-[#1A2B5F] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] ml-1">{produtosCarrinho ? produtosCarrinho.length : 0}</p>
                </button>
                <div className="flex items-center justify-center">
                    <img src="logout_icon.png" alt="Imagem logOut" className="h-10 w-10 cursor-pointer hover:opacity-80 transition"/>
                </div>
            </div>
        </div>
    </header>
   );
}

export default LandingPagesNav;