import { StatusResolver } from './graphql/status.resolver'
import { StatusController } from './openapi/status.controller'
import { StatusService } from './status.service'
import { Module } from '@nestjs/common'

@Module({
  controllers: [StatusController],
  providers: [StatusResolver, StatusService],
})
export class StatusModule {}
