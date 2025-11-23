import { createProduto } from '../../services/produto';
import {describe, beforeEach, it, expect, vi} from 'vitest'
import prisma from '../../services/db'
import { getProdutoById } from '../../services/produto';


const findUniqueSpy = vi.spyOn(prisma.produto, 'findUnique')
type ProdutoInput = { id: string, nome: string; preco: number, descricao: string, img: string };



describe('createProduto', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return the created product', async () => {
    const mockProduto: ProdutoInput = { id: expect.any(String), nome: 'Produto Teste', preco: 10, descricao: 'Descricao teste do produto teste ok', img: 'http://imagemdoProdutoTeste.com' };
    const mockResponse = { data: mockProduto, status: '201' };

    findUniqueSpy.mockResolvedValueOnce(mockResponse.data)

    const input = { nome: 'Produto Teste', preco: 10, descricao: 'Descricao teste do produto teste ok', img: 'http://imagemdoProdutoTeste.com' };
    const result = await createProduto(input);
  
    expect(result).toStrictEqual(mockProduto);
    expect(mockResponse.status).toBe('201');
  });
});

describe('getProdutoById', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return the product for a given id', async () => {
    const mockProduto: ProdutoInput = { id: 'produto-Teste-123', nome: 'Produto Consulta', preco: 25, descricao: 'Produto para teste de consulta', img: 'http://img-consulta.com' };
    findUniqueSpy.mockResolvedValueOnce(mockProduto);
    const inputId = 'produto-Teste-123'
    const result = await getProdutoById(inputId);
    expect(findUniqueSpy).toHaveBeenCalledWith({
      where: {
        id: 'produto-Teste-123',
      },
    });
    expect(result).toStrictEqual(mockProduto);
    
  });
});