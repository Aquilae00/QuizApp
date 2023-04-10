import { Answer } from "src/answer/answer.entity"

export interface QuestionRO {
    id: number,
    question: string,
    answers: {
        id: number,
        answer: string
    }[]
}

export interface ResultRO {
    questions: {
        id: number,
        question: string
        answers: Answer[]
        selection: string
        isCorrect: boolean
    }[]
    summary: {
        questionsCount: number,
        correctCount: number
    }
}