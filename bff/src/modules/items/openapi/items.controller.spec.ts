import { ItemsService } from '../items.service'
import { ItemsController } from './items.controller'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '~/src/prisma/prisma.service'

describe('ItemsController', () => {
  let controller: ItemsController
  // let service: ItemsService
  let itemId: string

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService, PrismaService],
    }).compile()

    controller = module.get<ItemsController>(ItemsController)
    // service = module.get<ItemsService>(ItemsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
