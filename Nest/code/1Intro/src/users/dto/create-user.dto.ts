import { 
  IsString, 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  MinLength, 
  MaxLength, 
  IsNumber,
  IsBoolean
} from 'class-validator';

export class CreateUserDto {

  @IsNumber()
  id!: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'name should be min 3 characters' })
  @MaxLength(10)
  name!: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsBoolean()
  @IsOptional()
  isMarried?: boolean;
}