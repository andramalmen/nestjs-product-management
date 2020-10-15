import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTStrategy } from './jwt.strategy';

const jwtConfig = config.get<{ secret: string; expiresIn: number }>('jwt');

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWTSecret || jwtConfig.secret,
            signOptions: {
                expiresIn: process.env.JWTExpiresIn || jwtConfig.expiresIn,
            },
        }),
        UsersModule,
        PassportModule,
    ],
    providers: [AuthService, JWTStrategy],
    controllers: [AuthController],
    exports: [JWTStrategy, PassportModule],
})
export class AuthModule {}
