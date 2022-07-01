import { IsEmail, IsNotEmpty } from 'class-validator';

export class UsersDto {
  id: number;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  admin?: boolean;
}
