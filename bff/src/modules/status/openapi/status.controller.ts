import { Status } from '../entities/status.entity'
import { StatusService } from '../status.service'
import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'

@Controller('status')
export class StatusController {
  constructor(private readonly service: StatusService) {}

  @Get()
  @ApiOperation({ summary: 'Get the service status.' })
  @ApiOkResponse({ type: Status, description: 'The service status.' })
  read() {
    const result = this.service.read()
    return result
  }
}
