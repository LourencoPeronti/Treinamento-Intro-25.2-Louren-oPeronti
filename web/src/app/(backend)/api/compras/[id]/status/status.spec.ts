import {upsateStatusCompra} from '../../../../services/compra'
import {describe, beforeEach, it, expect, vi} from 'vitest'
import prisma from '../../../../services/db'

const updateSpy = vi.spyOn(prisma.compra, 'update')

describe('updateStatusCompra', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should update and return the new status of a compra', async() => {
    const compraId = 'compra-teste-123'
    const newStatus = 'Paid'

    const mockUpdatedCompra = {
      id: compraId,
      status: newStatus
    }
    updateSpy.mockResolvedValueOnce(mockUpdatedCompra as any)
    const result = await upsateStatusCompra(compraId, newStatus as any)

    expect(updateSpy).toHaveBeenCalledWith({
      where: {
        id: compraId
      },
      data: { status: newStatus }
    })
    expect(result).toStrictEqual(mockUpdatedCompra)


  })
})