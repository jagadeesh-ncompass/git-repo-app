/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/user')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/create')
  async createUsers(@Body() data: any) {
    const user = await this.userService.create(data);
    delete user.password;
    return this.success('User created successfully', user);
  }
  success(message: string, data) {
    return {
      success: true,
      message: message,
      data: data,
    };
  }
  //function for error response
  error(message: string, data) {
    return {
      success: false,
      message: message,
      data: data,
    };
  }
}
