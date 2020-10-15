import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as config from 'config';
import { AppModule } from './app.module';

async function bootstrap() {
    const serverConfig = config.get<{ port: number }>('server');

    const logger = new Logger('Bootstrap');

    const app = await NestFactory.create(AppModule, {
        logger:
            process.env.NODE_ENV === 'production'
                ? ['error', 'warn', 'verbose']
                : ['log', 'error', 'warn', 'debug', 'verbose'],
    });
    app.enableCors();
    app.use(bodyParser.json({ limit: '50mb' }));

    const PORT = process.env.port || serverConfig.port || 3001;

    await app.listen(PORT);
    logger.log(`Application started at port: ${PORT}`);
}
bootstrap();
