import { Body, Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { ValidateAnswerDto } from "./question.dto";
import { QuestionService } from "./question.service";

@Controller('questions')
export class QuestionController {
    constructor(
        @Inject(QuestionService)
        private questionService: QuestionService
    ) { }

    @Get()
    @UseGuards(AuthGuard)
    async getQuestions() {
        return await this.questionService.getQuestions();
    }

    @Post('validate')
    @UseGuards(AuthGuard)
    async validate(
        @Body() validateDto: ValidateAnswerDto
    ) {
        return await this.questionService.getResult(validateDto);
    }
}