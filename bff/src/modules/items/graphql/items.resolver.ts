import { Item } from '../entities/item.entity'
import { ItemsService } from '../items.service'
import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ItemsResolver {
  constructor(private readonly service: ItemsService) {}

  @Query(() => [Item])
  async items(): Promise<Item[]> {
    const items = this.service.readAll()
    return items
  }
}
