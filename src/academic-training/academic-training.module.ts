import { Module } from '@nestjs/common';
import { AcademicTrainingService } from './academic-training.service';
import { AcademicTrainingController } from './academic-training.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicTraining } from './entities/academic-training.entity';

@Module({
  controllers: [AcademicTrainingController],
  providers: [AcademicTrainingService],
  imports: [TypeOrmModule.forFeature([AcademicTraining])],
})
export class AcademicTrainingModule {}
