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
      'typeorm',
      'html',
      'hbs',
    ],
    { each: true },
  )
  @IsArray()
  developerToolsBackend: string[];

  @IsString({ each: true })
  @IsOptional()
  @IsIn(
    [
      'css',
      'sass',
      'javascript',
      'boostrap',
      'react',
      'angular',
      'html',
      'figma',
    ],
    {
      each: true,
    },
  )
  @IsArray()
  developerToolsFrontend: string[];

  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  links: string;

  @IsString()
  @IsIn([
    'HTML-CSS',
    'HTML-CSS-JS',
    'JAVASCRIPT',
    'REACT',
    'ANGULAR',
    'EXPRESS',
    'NESTJS',
  ])
  tag: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images: string[];
}
