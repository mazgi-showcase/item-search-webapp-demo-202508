import { CreateItemDto } from './dtos/create-item.dto'
import { Item } from './entities/item.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ulid } from 'ulid'
import { PrismaService } from '~/src/prisma/prisma.service'

@Injectable()
export class ItemsService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateItemDto): Promise<Item> {
    const data: Prisma.ItemsCreateInput = {
      id: ulid(),
      ...dto,
    }
    const result = this.prismaService.items.create({ data })
    return result
  }

  async read(where: Prisma.ItemsWhereUniqueInput): Promise<Item | null> {
    const item = this.prismaService.items.findUnique({
      where,
    })
    if (!item) {
      throw new NotFoundException('The item not found.')
    }
    return item
  }

  async readAll(): Promise<Item[]> {
    const items = this.prismaService.items.findMany()
    return items
  }

  async items(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ItemsWhereUniqueInput
    where?: Prisma.ItemsWhereInput
    orderBy?: Prisma.ItemsOrderByWithRelationInput
  }): Promise<Item[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.items.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }
}
