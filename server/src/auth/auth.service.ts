import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.readEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    let hash = await bcrypt.compare(pass, user.password);
    if (hash) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
}
