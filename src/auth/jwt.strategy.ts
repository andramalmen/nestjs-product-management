import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as config from 'config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

const jwtConfig = config.get<{ secret: string; expiresIn: number }>('jwt');

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    private logger = new Logger('JWTStrategy');

    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWTSecret || jwtConfig.secret,
        });
    }

    async validate(payload: JwtPayload): Promise<User | void> {
        const { username } = payload;

        const user = await this.usersService.findUser(username);
        if (!user) {
            this.logger.error('Must be logged in to do thois change');
            throw new UnauthorizedException();
        }
        return user;
    }
}
