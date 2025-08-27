import { Item } from '../entities/item.entity'
import { ItemsService } from '../items.service'
import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'

@Controller('items')
export class ItemsController {
  constructor(private readonly service: ItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all items.' })
  @ApiOkResponse({ type: [Item], description: 'Return all items.' })
  async readAll(): Promise<Item[]> {
    const items = this.service.readAll()
    return items
  }
}
