import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Repo } from './entities/repository.entity';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(Repo)
    private repositoryService: Repository<Repo>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async getRepositories(user: User) {
    let repositories;
    repositories = await this.cacheManager.get('repositories');
    const userEmail = await this.cacheManager.get('userEmail');
    if (!repositories || userEmail !== user.email) {
      const repository = await this.repositoryService.find({
        where: { email: user.email },
      });
      if (repository.length === 0) {
        throw new NotFoundException('No repositories found');
      }
      await this.cacheManager.set('repositories', repository, { ttl: 3600 });
      await this.cacheManager.set('userEmail', user.email, { ttl: 3600 });
      repositories = await this.cacheManager.get('repositories');
    }
    return {
      success: true,
      message: 'Fetched User Repositories',
      data: repositories,
    };
  }

  async fetchAllRepositories() {
    const result = await this.repositoryService.find();
    if (result.length === 0) {
      return false;
    } else {
      return true;
    }
  }
}
