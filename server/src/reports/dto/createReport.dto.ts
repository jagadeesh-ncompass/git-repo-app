import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  make: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  mileage: number;
}
