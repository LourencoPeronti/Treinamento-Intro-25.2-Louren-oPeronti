import {describe, beforeEach, it, expect, vi} from 'vitest'
import prisma from '../../../services/db'
import {createCompra} from '../../../services/compra'

const createSpy = vi.spyOn(prisma.compra, 'create')


describe('createCompra', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should create and return a new compra', async() => {
    const mockedCompra = {
      produtos: [
        { id: 'produto-123', quantidade: 2 },
        { id: 'produto-456', quantidade: 1 }
      ],
      userIds: ['user-123']
    }

    const mockCreatedCompra = {
    PrecoTotal: 500,
    id: "Compra-teste-123",
    status: "Pending"
    }

    createSpy.mockResolvedValueOnce(mockCreatedCompra as any)

    const result = await createCompra(mockedCompra)

    expect(result).toStrictEqual(mockCreatedCompra)
  })

  it('Should return error in case of invalid product IDs', async() => {
    const mockedCompra = {
      produtos: [
        { id: 'invalid-product-123', quantidade:2},
      ],
      userIds: ['user-123']
    }
    createSpy.mockRejectedValueOnce(new Error('Falha ao criar compra'))

    await expect(createCompra(mockedCompra)).rejects.toThrow('Falha ao criar compra')

  })
})