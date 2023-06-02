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
  @IsOptional()
  @IsIn(
    [
      'express',
      'nestjs',
      'nodejs',
      'sequelize',
      'mysql',
      'mssql',
      'postgres',
      'docker',
      'javascript',
      'typescript',
      'html',
    ],
    { each: true },
  )
  @IsOptional()
  @IsIn(
    [
      'express',
      'nestjs',
      'nodejs',
      'sequelize',
      'mysql',
      'mssql',
      'postgres',
      'docker',
      'javascript',
      'typescript',
      'html',
    ],
    { each: true },
  )
  @IsArray()
  developerToolsBackend: string[];

  @IsString({ each: true })
  @IsOptional()
  @IsIn(['css', 'sass', 'javascript', 'boostrap', 'react', 'angular', 'html'], {
    each: true,
  })
  @IsArray()
  developerToolsFrontend: string[];

  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  links: string;

  @IsString()
  tag: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images: string[];
}
