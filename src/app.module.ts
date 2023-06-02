import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.PORT_DB,
      username: process.env.USER_NAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.NAME_DB,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
