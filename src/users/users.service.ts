import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(createUserDTO: CreateUserDTO): Promise<void> {
        try {
            const { username, password } = createUserDTO;

            const salt = await genSalt();
            const hashedPassword = await this.hashPassword(password, salt);
            const newUser = new this.userModel({ username, password: hashedPassword, salt });
            await newUser.save();
        } catch (err) {
            if (err.code === 11000) {
                // duplicate username
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async findUser(username: string): Promise<User | null> {
        const user = await this.userModel.findOne({ username }).exec();
        return user;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return hash(password, salt);
    }

    async validateUserPassword(createUserDTO: CreateUserDTO): Promise<string | null> {
        const { username, password } = createUserDTO;
        const user = await this.findUser(username);

        if (user && (await this.validatePassword(password, user.password, user.salt))) {
            return user.username;
        } else {
            return null;
        }
    }

    private async validatePassword(
        password: string,
        hashedPassword: string,
        salt: string
    ): Promise<boolean> {
        const passwordHash = await hash(password, salt);
        return passwordHash === hashedPassword;
    }
}
