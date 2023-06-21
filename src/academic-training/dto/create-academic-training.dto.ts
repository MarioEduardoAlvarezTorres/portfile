import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAcademicTrainingDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
