import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnouncementModule } from './announcements/announcements.module';
import { QuizModule } from './quizzes/quiz.module';
import { AnnouncementService } from './announcements/announcements.service';
import { AnnouncementController } from './announcements/announcements.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    AnnouncementModule,
    QuizModule,
  ],

})
export class AppModule {}