import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/createReport.dto';
import { Report } from './entity/reports.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async create(createReportDto: CreateReportDto, session: Record<string, any>) {
    if (!session) {
      throw new UnauthorizedException('Sign in first');
    }
    const userId = session.id;
    console.log(userId);
    createReportDto['user'] = userId;
    console.log(createReportDto);
    const data = await this.reportRepository.save(createReportDto);
    return {
      message: 'Report saved sucessfully! Admin approval required',
      data: data,
    };
  }

  async findAll() {
    const reports = await this.reportRepository.find();
    let approvedReports;
    if (reports.length === 0) {
      throw new NotFoundException('No reports available');
    }
    reports.forEach((data) => {
      if (data.approved) {
        approvedReports = data;
      }
    });
    if (!approvedReports) {
      throw new NotFoundException('There is no reports approved by admin');
    }
    return {
      message: 'Reports retrived sucessfully',
      data: approvedReports,
    };
  }

  async approveReport(
    id: number,
    userInput: any,
    session: Record<string, any>,
  ) {
    const isAdmin = session.admin;
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can approve reports');
    }
    const reportData = await this.reportRepository.findOne({
      where: { id: id },
    });
    reportData.approved = userInput.approved;
    const result = await this.reportRepository.save(reportData);
    return result;
  }
}
