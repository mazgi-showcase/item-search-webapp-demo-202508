import { Status } from '../entities/status.entity'
import { StatusService } from '../status.service'
import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class StatusResolver {
  constructor(private readonly service: StatusService) {}

  @Query(() => Status, { name: 'status' })
  read() {
    return this.service.read()
  }
}
