import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AcademicTrainingService } from './academic-training.service';
import { CreateAcademicTrainingDto } from './dto/create-academic-training.dto';
import { UpdateAcademicTrainingDto } from './dto/update-academic-training.dto';

@Controller('academic-training')
export class AcademicTrainingController {
  constructor(
    private readonly academicTrainingService: AcademicTrainingService,
  ) {}

  @Post()
  create(@Body() createAcademicTrainingDto: CreateAcademicTrainingDto) {
    return this.academicTrainingService.create(createAcademicTrainingDto);
  }

  @Get()
  findAll() {
    return this.academicTrainingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.academicTrainingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAcademicTrainingDto: UpdateAcademicTrainingDto,
  ) {
    return this.academicTrainingService.update(id, updateAcademicTrainingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.academicTrainingService.remove(id);
  }
}
