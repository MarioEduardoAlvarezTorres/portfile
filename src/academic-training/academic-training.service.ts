import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAcademicTrainingDto } from './dto/create-academic-training.dto';
import { UpdateAcademicTrainingDto } from './dto/update-academic-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AcademicTraining } from './entities/academic-training.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class AcademicTrainingService {
  constructor(
    @InjectRepository(AcademicTraining)
    private readonly academicRepository: Repository<AcademicTraining>,
  ) {}

  async create(createAcademicTrainingDto: CreateAcademicTrainingDto) {
    try {
      const training = this.academicRepository.create(
        createAcademicTrainingDto,
      );
      await this.academicRepository.save(training);
      return training;
    } catch (error) {}
  }

  async findAll() {
    const training = await this.academicRepository.find();
    return training;
  }

  async findOne(id: string) {
    let training: AcademicTraining;

    if (isUUID(id)) {
      training = await this.academicRepository.findOneBy({ id });
    } else {
      const queryBuilder = this.academicRepository.createQueryBuilder();
      training = await queryBuilder
        .where('UPPER(title) =:title', {
          title: id.toUpperCase(),
        })
        .getOne();
    }

    if (!training) throw new NotFoundException(`Training with ${id} not found`);

    return training;
  }

  async update(
    id: string,
    updateAcademicTrainingDto: UpdateAcademicTrainingDto,
  ) {
    const training = await this.academicRepository.preload({
      id,
      ...updateAcademicTrainingDto,
    });

    await this.academicRepository.save(training);
  }

  async remove(id: string) {
    const training = await this.findOne(id);
    await this.academicRepository.remove(training);
  }
}
