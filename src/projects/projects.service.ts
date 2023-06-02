import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProjectImage } from './entities/project-image.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectImage)
    private readonly projectImageRepository: Repository<ProjectImage>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      const { images = [], ...dataProject } = createProjectDto;
      const project: Project = this.projectRepository.create({
        ...dataProject,
        images: images.map((image) =>
          this.projectImageRepository.create({ url: image }),
        ),
      });
      await this.projectRepository.save(project);

      return project;
    } catch (error) {}
  }

  async findAll() {
    const projects = await this.projectRepository.find({
      relations: {
        images: true,
      },
    });

    return projects.map((projects) => ({
      ...projects,
      images: projects.images.map((img) => img.url),
    }));
  }

  async findOne(id: string) {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) throw new NotFoundException(`Project with ${id} not found`);

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const { images, ...toUpdate } = updateProjectDto;

    const project = await this.projectRepository.preload({ id, ...toUpdate });

    if (!project)
      throw new NotFoundException(`Project with id: ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        await queryRunner.manager.delete(ProjectImage, { project: { id } });

        project.images = images.map((image) =>
          this.projectImageRepository.create({ url: image }),
        );
      }

      await queryRunner.manager.save(project);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async findOnePlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term);
    return {
      ...rest,
      images: images.map((image) => image.url),
    };
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }

  handleDBExceptions(error: any) {
    throw new Error('Method not implemented.');
  }
}
