import { PartialType } from '@nestjs/swagger';
import { CreateAcademicTrainingDto } from './create-academic-training.dto';

export class UpdateAcademicTrainingDto extends PartialType(CreateAcademicTrainingDto) {}
