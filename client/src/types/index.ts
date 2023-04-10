export interface QuestionRO {
    id: number,
    question: string,
    answers: Pick<Answer, 'id' | 'answer'>[]
}

export interface ResultRO {
    questions: {
        id: number,
        question: string
        answers: Answer[]
        selection: number
        isCorrect: boolean
    }[]
    summary: {
        questionsCount: number,
        correctCount: number
    }
}

export interface Answer {
    id: number,
    answer: string,
    correct: boolean
}