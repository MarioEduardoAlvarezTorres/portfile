import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class AcademicTraining {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  description: string;
}
