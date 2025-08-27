import { Item } from '../entities/item.entity'
import { ItemsService } from '../items.service'
import { NotFoundException } from '@nestjs/common'
import { Args, ID, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ItemsResolver {
  constructor(private readonly service: ItemsService) {}

  @Query(() => Item)
  async item(@Args('id', { type: () => ID }) id: string): Promise<Item | null> {
    const item = this.service.read({ id })
    if (!item) {
      throw new NotFoundException('The item not found.')
    }
    return item
  }

  @Query(() => [Item], { name: 'items' })
  async items(): Promise<Item[]> {
    const items = this.service.readAll()
    return items
  }
}
