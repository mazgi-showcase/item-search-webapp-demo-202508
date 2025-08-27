import { ItemsResolver } from './graphql/items.resolver'
import { ItemsService } from './items.service'
import { ItemsController } from './openapi/items.controller'
import { Module } from '@nestjs/common'
import { PrismaService } from '~/src/prisma/prisma.service'

@Module({
  controllers: [ItemsController],
  providers: [PrismaService, ItemsResolver, ItemsService],
})
export class ItemsModule {}
