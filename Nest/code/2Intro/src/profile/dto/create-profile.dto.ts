import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;
}
