import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private usersService: UsersService, private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) createUserDTO: CreateUserDTO): Promise<void> {
        return this.usersService.createUser(createUserDTO);
    }

    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) createUserDTO: CreateUserDTO
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(createUserDTO);
    }
}
