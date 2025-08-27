import { ItemsService } from '../items.service'
import { ItemsController } from './items.controller'
import { Test, TestingModule } from '@nestjs/testing'
import { ulid } from 'ulid'
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

  describe('create', () => {
    it('should return the created item if the proper request is sent', async () => {
      const text =
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      const reqBody = {
        text,
      }
      // const resBody = {
      //   id: ulid(),
      //   text,
      // }
      // jest.spyOn(service, 'create').mockImplementation(() => resBody)

      const item = await controller.create(reqBody)
      // https://jestjs.io/docs/using-matchers#common-matchers
      // > toBe uses Object.is to test exact equality. If you want to check the value of an object, use toEqual instead:
      expect(item.text).toBe(text)
      itemId = item.id
    })
    it('should return 400 bad request if the empty text is sent', async () => {
      const text = ''
      const reqBody = {
        text,
      }
      const item = await controller.create(reqBody)
    })
  })

  describe('read', () => {
    it('should return the item that is specified by the id', async () => {
      const id = '01125TAZM85RDKJWKSC9JBRV16'
      const item = await controller.read(id)
      expect(item?.id).toBe(id)
      expect(item?.text).toMatch(/^\(fixed\)Lorem Ipsum/)
    })
  })

  describe('readAll', () => {
    it('should return all items', async () => {
      const items = await controller.readAll()
      expect(items).toContainEqual({
        id: '01125TAZM85RDKJWKSC9JBRV16',
        text: '(fixed)Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      })
    })
  })
})
