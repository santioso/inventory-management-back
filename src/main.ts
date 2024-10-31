import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:4200',  // Permite sólo el frontend en localhost:4200
    methods: 'GET,POST,PUT,DELETE, PATCH',   // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization',  // Encabezados permitidos
  });

  await app.listen(3000);
}
bootstrap();
