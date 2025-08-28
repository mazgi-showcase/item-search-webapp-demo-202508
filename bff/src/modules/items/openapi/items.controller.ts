import { Prisma } from '@prisma/client'
import { CreateItemDto } from '../dtos/create-item.dto'
import { Item } from '../entities/item.entity'
import { ItemsService } from '../items.service'
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger'

@Controller('items')
export class ItemsController {
  constructor(private readonly service: ItemsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created the item.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Create the item.' })
  async create(@Body() reqBody: CreateItemDto): Promise<Item> {
    return this.service.create(reqBody)
  }

  @Get(':id')
  @ApiOkResponse({
    type: Item,
    description: 'Return the item.',
  })
  @ApiNotFoundResponse({ description: 'The item not found.' })
  @ApiOperation({ summary: 'Get the item by ID.' })
  @ApiParam({
    name: 'id',
    examples: {
      id1: { value: '01125TAZM85RDKJWKSC9JBRV16' },
      id2: { value: '01125TAZM8DAD8PQ1XSDTJJZE7' },
    },
  })
  async read(@Param('id') id: string): Promise<Item | null> {
    const item = this.service.read({ id })
    if (!item) {
      throw new NotFoundException('The item not found.')
    }
    return item
  }

  @Get()
  @ApiOperation({ summary: 'Get all items.' })
  @ApiOkResponse({ type: [Item], description: 'Return all items.' })
  async readAll(): Promise<Item[]> {
    const items = this.service.readAll()
    return items
  }

  @Get('findByText/:text')
  @ApiParam({
    name: 'text',
    examples: {
      keyword1: { value: 'fixed' },
      wildcard: { value: '*' },
    },
  })
  @ApiOperation({ summary: 'Find items by text.' })
  @ApiOkResponse({ type: [Item], description: 'Return matched items.' })
  async findByText(@Param('text') text: string): Promise<Item[]> {
    const where: Prisma.ItemsWhereInput =
      text === '*'
        ? {}
        : {
            text: {
              contains: text,
            },
          }
    const params = { where }
    const items = this.service.items(params)
    return items
  }
}
