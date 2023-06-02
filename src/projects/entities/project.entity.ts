import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectImage } from './project-image.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('simple-array')
  developerToolsBackend: string[];

  @Column('simple-array')
  developerToolsFrontend: string[];

  @Column()
  link: string;

  @OneToMany(() => ProjectImage, (projectImage) => projectImage.project, {
    cascade: true,
    eager: true,
  })
  images: ProjectImage[];
}
