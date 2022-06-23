import {Controller, Get, Post, Body, Patch, Param, Request,UseGuards} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ApproveReportDto } from './dto/approveReport.dto';
import { CreateReportDto } from './dto/createReport.dto';
import { ReportsService } from './reports.service';

@Controller('report')
export class ReportsController {
  constructor(private readonly reportService: ReportsService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('/create')
  create(@Request() req, @Body() createReport: CreateReportDto) {
    return this.reportService.create(createReport, req.user);
  }

  @Get('/readall')
  findAll() {
    return this.reportService.findAll();
  }

  @UseGuards(AuthenticatedGuard)
  @Patch('/approvereport/:id')
  approveReport(
    @Param('id') id: string,
    @Body() approve: ApproveReportDto,
    @Request() req,
  ) {
    return this.reportService.approveReport(+id, approve, req.user);
  }
}
