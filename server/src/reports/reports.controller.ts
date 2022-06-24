import { Controller, Get } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ReportsService } from './reports.service';

@Controller('repo')
export class ReportsController {
  constructor(private readonly reportService: ReportsService) {}

  @Cron('* 1 * * * *')
  handleCron() {
    this.reportService.cronFunc();
  }
  @Get('/repo')
  async repo() {
    const data = await this.reportService.readRepo();
    await Promise.all(
      data.map(async (x) => {
        await this.reportService.createRepo(x);
      }),
    );
  }
}
