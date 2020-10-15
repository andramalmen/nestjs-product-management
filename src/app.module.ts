import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from 'config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

const dbConfig = config.get<{ url: string; database: string; strategies: string }>('db');

const dbUrl = process.env.dbUrl || dbConfig.url;
const dbName = process.env.dbName || dbConfig.database;
const dbStrategies = process.env.dbStrategies || dbConfig.strategies;

@Module({
    imports: [
        MongooseModule.forRoot(`${dbUrl}${dbName}?${dbStrategies}`),
        ProductsModule,
        AuthModule,
        UsersModule,
    ],
})
export class AppModule {}
