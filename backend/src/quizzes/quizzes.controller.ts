import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Quiz as QuizModel, Question as QuestionModel, Quiz } from 'generated/prisma'
import { QuizService } from 'src/quizzes/quiz.service';

@Controller('quizzes')
export class QuizzesController {
    constructor(
        private readonly quizService: QuizService
    ) { }

    @Post()
    async postQuiz(
        @Body() quizData: { title: string, questions: any[] }
    ): Promise<QuizModel> {
        console.log('Received data:', quizData);
        console.log('Type of quizData:', typeof quizData);
        console.log('Keys:', Object.keys(quizData || {}));

        if (!quizData) {
            throw new BadRequestException('No data received');
        }
        const { title, questions } = quizData

        return this.quizService.createQuiz({
            title,
            questions
        })
    }

    @Get()
    async getQuizzes(): Promise<QuizModel[]> {
        return this.quizService.quizzes()
    }

    @Get(':id')
    async getQuiz(@Param('id') id: string): Promise<QuizModel | null> {
        return this.quizService.quiz({ id: Number(id) })
    }

    @Delete(':id')
    async deleteQuiz(@Param('id') id: string): Promise<QuizModel> {
        return this.quizService.deleteQuiz(({ id: Number(id) }))
    }
}
