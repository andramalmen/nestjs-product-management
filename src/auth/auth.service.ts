import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');

    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(createUserDTO: CreateUserDTO): Promise<string | void> {
        const { username, password } = createUserDTO;
        const user = await this.usersService.findUser(username);

        if (user && this.validatePassword(password, user.salt)) {
            return user.username;
        } else {
            throw new UnauthorizedException();
        }
    }

    private async validatePassword(password: string, salt: string): Promise<boolean> {
        const passwordHash = await hash(password, salt);
        return passwordHash === password;
    }

    async signIn(createUserDTO: CreateUserDTO): Promise<{ accessToken: string }> {
        const username = await this.usersService.validateUserPassword(createUserDTO);

        if (!username) {
            this.logger.debug('Sign in: User not found');
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
