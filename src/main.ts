import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const allowedOrigins = [
        'https://empatia-online-sessions.vercel.app',
        'http://localhost:3000',
        'http://localhost:5173',
        process.env.FRONTEND_URL
    ].filter(Boolean);

    app.enableCors({
        origin: allowedOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
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
    console.log(`🚀 Servidor iniciado en puerto ${port}`);
    console.log(`🌐 CORS habilitado para: ${allowedOrigins.join(', ')}`);
    
    await app.listen(port);
}

bootstrap(); 