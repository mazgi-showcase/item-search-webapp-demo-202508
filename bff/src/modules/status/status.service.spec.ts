import { StatusService } from './status.service'
import { Test, TestingModule } from '@nestjs/testing'

describe('StatusService', () => {
  let service: StatusService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusService],
    }).compile()

    service = module.get<StatusService>(StatusService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
