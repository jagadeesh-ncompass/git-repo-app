import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';
import { UserModule } from './users/user.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import 'dotenv/config';
import { Repo } from './reports/entity/reports.entity';
import { currentUser } from './users/middleware/current-user.middleware';
import { UserController } from './users/user.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Repo],
      synchronize: true,
    }),
    ReportsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(currentUser).forRoutes(UserController);
  }
}
