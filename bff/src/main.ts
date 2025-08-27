import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from '~/src/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle(`${process.env.npm_package_name || 'bff+undef'} OpenAPI`)
      .setDescription('The Swagger UI')
      .setVersion(process.env.npm_package_version || '0.0.0+undef')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('swagger', app, document)
  }
  const port = Number(process.env.PORT) || 4000
  await app.listen(port)
}
bootstrap()
