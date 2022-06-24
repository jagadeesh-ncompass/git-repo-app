import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Repo } from './entity/reports.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Repo)
    private repoRepository: Repository<Repo>,
  ) {}

  async createRepo(data: any) {
    const repo = this.repoRepository.create({
      id: data[0],
      repo: data[1],
      user: data[2],
    });
    this.repoRepository.save(repo);
  }

  async cronFunc() {
    const data = await this.readRepo();
    await Promise.all(
      data.map(async (x) => {
        await this.createRepo(x);
      }),
    );
    console.log('cron is running');
  }

  async readRepo() {
    const users: string[] = ['jagadeesh-ncompass', 'jagadeesh70'];
    const data = await this.readRepos(users);
    return data;
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
