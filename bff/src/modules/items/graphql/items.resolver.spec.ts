import { ItemsService } from '../items.service'
import { ItemsResolver } from './items.resolver'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '~/src/prisma/prisma.service'

describe('ItemsResolver', () => {
  let resolver: ItemsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsResolver, ItemsService, PrismaService],
    }).compile()

    resolver = module.get<ItemsResolver>(ItemsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
