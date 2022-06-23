import {BadRequestException, Body, Controller, NotFoundException, Post, Request, Session, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UsersDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req: any) {
    return { message: 'Logged in' };
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createUsers(@Body() data: UsersDto) {
    const findUser = await this.userService.readEmail(data.email);
    if (findUser) {
      throw new BadRequestException('User already exist');
    }
    const user = await this.userService.create(data);
    if (!user) {
      throw new NotFoundException('User not created');
    }
    return this.success('User created', user);
  }


  @Post('/logout')
  logout(@Session() ses: any) {
    ses = null;
  }

  success(message: string, data) {
    return {
      success: true,
      message: message,
      data: data,
    };
  }
  
}
