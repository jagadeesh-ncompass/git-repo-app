import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosResponse } from 'axios';
import 'dotenv/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly http: HttpService,
  ) {}

  async create(data: UsersDto) {
    const password: string = await this.setPassword(data.password);
    const user = this.userRepository.create({ ...data, password: password });
    this.userRepository.save(user);
    return { username: user.username };
  }

  async readUser(username: string) {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async readRepo() {
    const users: string[] = ['jagadeesh-ncompass', 'jagadeesh70'];
    const data = await this.readRepos(users);
    return data;
  }

  async setPassword(password: string) {
    if (password) {
      const salt = await bcrypt.genSalt();
      return await bcrypt.hash(password, salt);
    }
    throw new BadRequestException('Invalid request');
  }

  async readRepos(arr: any) {
    const data = [];
    const result = [];
    data.push(
      await Promise.all(
        arr.map(async (x: string) => {
          return await (
            await axios.get(`https://api.github.com/users/${x}/repos`, {
              headers: {
                Authorization: process.env.TOKEN,
              },
            })
          ).data;
        }),
      ),
    );
    data.map((x) => {
      for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x[i].length; j++) {
          result.push([x[i][j].id, x[i][j].name, x[i][j].owner.login]);
        }
      }
    });
    return result;
  }
}
