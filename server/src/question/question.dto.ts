import {
    ArrayMinSize,
    IsArray, isNotEmpty, IsNotEmpty, IsNumber, IsString, ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer'
export class ValidateAnswerDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuestionAnswerDto)
    @IsNotEmpty()
    answers: QuestionAnswerDto[]
}

export class QuestionAnswerDto {
    @IsNumber()
    @IsNotEmpty()
    questionId: number;

    @IsNumber()
    @IsNotEmpty()
    answerId: number;
}