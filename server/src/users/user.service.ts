import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
 

  async create(data: UsersDto) {
    const password: string = await this.setPassword(data.password);
    const user = this.userRepository.create({ ...data, password: password });
    this.userRepository.save(user);
    return { email: user.email };
  }

  async read(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  
  destroy(id: number) {
    this.userRepository.delete({ id: id });
    return { deleted: true };
  }

  async readEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async setPassword(password: string) {
    if (password) {
      const salt = await bcrypt.genSalt();
      return await bcrypt.hash(password, salt);
    }
    throw new BadRequestException('Invalid request');
  }
}
