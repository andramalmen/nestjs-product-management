import { IsDefined, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
    @IsDefined({
        message: 'The username must be defined',
    })
    @IsString({
        message: 'The username must be a string',
    })
    @MinLength(4)
    @MaxLength(20, {
        message: 'The username must have at most 20 characters',
    })
    readonly username: string;

    @IsDefined({
        message: 'The password must be defined',
    })
    @IsString({
        message: 'The password must be a string',
    })
    @MinLength(8, {
        message: 'The password must have at least 8 characters',
    })
    @MaxLength(20, {
        message: 'The password must have at most 20 characters',
    })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak',
    })
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
