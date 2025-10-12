



function ProdutoCard({produto, adicionaCarrinho}){

  
  return(
    <div className="bg-[#D6E4FF] h-auto border-[3px] border-[#94ADD2] rounded-[20px] flex flex-col items-center justify-center gap-4 p-[15px] text-center font-[Gorditas] pt-5">
      <h2 className="text-2xl font-bold">{produto.nome}</h2>
      <img src={produto.img} className="h-[150px] w-[150px]"/>
      <h2 className="text-2xl font-bold">{produto.preco}</h2>
      <p className="font-sans font-[700] leading-tight">{produto.descricao}</p>
      {produto.isOnCarrinho == false? 
      <button className="flex h-auto w-[40%] border-[2px] border-[#94ADD2] rounded-[10px] bg-[#3366FF] justify-center filter hover:brightness-70 cursor-pointer transition duration-200" onClick={()=>adicionaCarrinho(produto.id)}>
        <img src="adc_carrinho.png" className=""/>
      </button> :
      <button className="flex h-auto w-[40%] border-[2px] border-[#94ADD2] rounded-[10px] bg-red-500 justify-center filter hover:brightness-70 cursor-pointer transition duration-200" onClick={()=>adicionaCarrinho(produto.id)}>
        <img src="remove_carrinho.png" className=""/>
      </button>
      }
    </div>
  )
}

export default ProdutoCard