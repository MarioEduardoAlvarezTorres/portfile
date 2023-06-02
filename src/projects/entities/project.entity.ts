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

  @Column('simple-array', { nullable: true })
  developerToolsBackend: string[];

  @Column('simple-array', { nullable: true })
  developerToolsFrontend: string[];

  @Column('simple-array', { nullable: true })
  links: string;

  @Column()
  tag: string;

  @OneToMany(() => ProjectImage, (projectImage) => projectImage.project, {
    cascade: true,
    eager: true,
  })
  images?: ProjectImage[];
}
