import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateUser {
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}
