import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RepositoryService } from './repository/repository.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private repositoryService: RepositoryService,
  ) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    const token = this.authService.login(req.user);
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/repositories')
  async getRepositories(@Request() req) {
    return await this.repositoryService.getRepositories(req.user);
  }
}
