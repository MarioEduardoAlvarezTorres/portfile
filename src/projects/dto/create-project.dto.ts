import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  @MinLength(5)
  description: string;

  @IsString({ each: true })
  @IsIn(['express', 'nestjs'], { each: true })
  @IsArray()
  developerToolsBackend: string[];

  @IsString({ each: true })
  @IsIn(['css', 'sass'], { each: true })
  @IsArray()
  developerToolsFrontend: string[];

  @IsString()
  @MinLength(5)
  link: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images: string[];
}
