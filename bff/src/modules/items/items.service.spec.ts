import { ItemsService } from './items.service'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '~/src/prisma/prisma.service'

describe('ItemsService', () => {
  let service: ItemsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService, PrismaService],
    }).compile()

    service = module.get<ItemsService>(ItemsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
