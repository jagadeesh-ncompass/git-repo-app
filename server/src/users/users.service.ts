import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: UsersDto) {
    const findUser = await this.findOne(data.email);
    if (findUser) {
      throw new BadRequestException('User Exist Already');
    }
    const password: string = await this.setPassword(data.password);
    const user = this.userRepository.create({ ...data, password: password });
    if (!user) {
      throw new NotFoundException('User Not Created');
    }
    await this.userRepository.save(user);
    return await this.findOne(user.email);
  }

  async findOne(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }
  async setPassword(password: string) {
    if (password) {
      const salt = await bcrypt.genSalt();
      return await bcrypt.hash(password, salt);
    }
    throw new BadRequestException('Invalid request');
  }
}
