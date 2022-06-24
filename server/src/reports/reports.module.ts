import { ReportsService } from './reports.service';
import { Module } from '@nestjs/common';
import { Repo } from './entity/reports.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Repo])],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
