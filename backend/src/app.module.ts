import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizzesController } from './quizzes/quizzes.controller';
import { QuizService } from './quizzes/quiz.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, QuizzesController],
  providers: [AppService, QuizService, PrismaService],
})
export class AppModule {}
