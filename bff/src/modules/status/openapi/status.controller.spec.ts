import { Status } from '../entities/status.entity'
import { StatusService } from '../status.service'
import { StatusController } from './status.controller'
import { Test, TestingModule } from '@nestjs/testing'

describe('StatusController', () => {
  let controller: StatusController
  // let service: StatusService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [StatusService],
    }).compile()

    controller = module.get<StatusController>(StatusController)
    // service = module.get<StatusService>(StatusService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('read', () => {
    it('should return the version', async () => {
      const name = process.env.npm_package_name || 'bff+undef-test'
      const environment = process.env.NODE_ENV || 'undef'
      const state = 'healthy'
      const version = process.env.npm_package_version || '0.0.0+undef-test'
      const resBody: Status = {
        name,
        environment,
        state,
        version,
      }
      // jest.spyOn(service, 'read').mockImplementation(() => resBody)

      // https://jestjs.io/docs/using-matchers#common-matchers
      // > toBe uses Object.is to test exact equality. If you want to check the value of an object, use toEqual instead:
      expect(controller.read()).toEqual(resBody)
    })
  })
})
