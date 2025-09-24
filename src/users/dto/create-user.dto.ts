import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
export class CreateUserDto {
    @IsString({message: 'Name must be a string'})
    @IsNotEmpty({message: 'Name is required'})
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN','ENGINEER','ADMIN'],{
        message: 'Valid role required'
    })
    role: 'INTERN' | 'ENGINEER' | 'ADMIN'
}