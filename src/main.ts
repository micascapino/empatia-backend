import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: [process.env.FRONTEND_URL],
        credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    const config = new DocumentBuilder()
        .setTitle('Empatía Online Sessions API')
        .setDescription('API para gestión de sesiones de psicología online')
        .setVersion('1.0')
        .addTag('psychologists')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`🚀 Aplicación ejecutándose en: http://localhost:${port}`);
    console.log(`📚 Documentación Swagger en: http://localhost:${port}/api`);
}

bootstrap(); 