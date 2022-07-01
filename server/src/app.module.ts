import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Repo } from './repository/entities/repository.entity';
import { RepositoryModule } from './repository/repository.module';
import { UsersModule } from './users/users.module';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      store: redisStore,
      socket: {
        host: process.env.HOST,
        port: 6379,
      },
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          dirname: './log',
          filename: 'info.log',
          level: 'info',
        }),
        new winston.transports.File({
          dirname: './log',
          filename: 'debug.log',
          level: 'debug',
        }),
        new winston.transports.File({
          dirname: './log',
          filename: 'error.log',
          level: 'error',
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Repo, User],
      synchronize: true,
    }),
    UsersModule,
    RepositoryModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
