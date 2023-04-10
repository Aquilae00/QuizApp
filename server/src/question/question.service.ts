import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Answer } from "src/answer/answer.entity";
import { In, Repository } from "typeorm";
import { ValidateAnswerDto } from "./question.dto";
import { Question } from "./question.entity";
import { QuestionRO, ResultRO } from "./question.interface";

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepo: Repository<Question>
    ) { }

    async getQuestions(): Promise<QuestionRO[]> {
        const questions = await this.questionRepo.find({ relations: { answers: true } });

        const questionsRO: QuestionRO[] = []
        questions.forEach((question) => {
            questionsRO.push({
                ...question,
                answers: question.answers.map(answer => ({ id: answer.id, answer: answer.answer }))
            })
        })

        return questionsRO
    }

    async getResult(validateDto: ValidateAnswerDto): Promise<ResultRO> {
        const selectionMap = {};
        const questionIds = [];
        const answerIds = new Set();
        validateDto.answers.forEach(answer => {
            questionIds.push(answer.questionId);
            answerIds.add(answer.answerId);
            selectionMap[answer.questionId] = answer.answerId
        })

        const questions = await this.questionRepo.find({ relations: { answers: true } })
        const answers = questions.reduce<Answer[]>((prev, question) => { return [...prev, ...question.answers] }, [])
        const trueAnswers = answers.filter(answer => answer.correct && answerIds.has(answer.id));
        const trueAnswersIds = trueAnswers.map(a => a.id)

        const results = questions.map(question => ({
            ...question,
            selection: selectionMap[question.id],
            isCorrect: trueAnswersIds.includes(selectionMap[question.id])
        }))
        const questionsCount = questions.length;
        const correctCount = trueAnswers.length
        return {
            questions: results,
            summary: {
                questionsCount,
                correctCount
            }
        }
    }


}