import {Injectable} from '@nestjs/common'
import {PrismaService} from '../prisma.service'
import { Quiz, Prisma } from 'generated/prisma'

@Injectable()
export class QuizService {
    constructor (private prisma: PrismaService) {}

    async quiz(
        quizWhereUniqueInput: Prisma.QuizWhereUniqueInput
    ): Promise<Quiz | null> {
        return this.prisma.quiz.findUnique({
            where: quizWhereUniqueInput
        })
    }

    async quizzes(): Promise<Quiz[]> {
    return this.prisma.quiz.findMany();
  }

  async createQuiz(data: Prisma.QuizCreateInput): Promise<Quiz> {
    return this.prisma.quiz.create({
      data,
    });
  }

  async updateQuiz(params: {
    where: Prisma.QuizWhereUniqueInput;
    data: Prisma.QuizUpdateInput;
  }): Promise<Quiz> {
    const { data, where } = params;
    return this.prisma.quiz.update({
      data,
      where,
    });
  }

  async deleteQuiz(where: Prisma.QuizWhereUniqueInput): Promise<Quiz> {
    return this.prisma.quiz.delete({
      where,
    });
  }
}

