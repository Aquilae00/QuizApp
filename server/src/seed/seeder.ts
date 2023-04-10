import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Answer } from "src/answer/answer.entity";
import { Question } from "src/question/question.entity";
import { Repository } from "typeorm";

@Injectable()
export class Seeder {
    constructor(
        @InjectRepository(Question)
        private questionRepo: Repository<Question>,
        @InjectRepository(Answer)
        private answerRepo: Repository<Answer>
    ) { }

    async seed() {
        await this.questionRepo.delete({});
        await this.answerRepo.delete({})



        const question1: Question = new Question()
        question1.question = 'Who killed Jango Fett?'

        const answer1 = new Answer()
        answer1.answer = 'Jabba the Hutt'
        answer1.correct = false
        answer1.question = question1
        const answer2 = new Answer()
        answer2.answer = 'Han Solo'
        answer2.correct = false
        answer2.question = question1
        const answer3 = new Answer()
        answer3.answer = 'Mace Windu'
        answer3.correct = true
        answer3.question = question1
        const answer4 = new Answer()
        answer4.answer = 'Count Dooku'
        answer4.correct = false
        answer4.question = question1

        question1.answers = [answer1, answer2, answer3, answer4]
        await this.questionRepo.save(question1)

        const question2: Question = new Question()
        question2.question = 'What is the name of the beast that Padme rides in the battle on Geonosis?'

        const answer5 = new Answer()
        answer5.answer = 'Nexu'
        answer5.correct = false
        answer5.question = question2
        const answer6 = new Answer()
        answer6.answer = 'Rancor'
        answer6.correct = false
        answer6.question = question2
        const answer7 = new Answer()
        answer7.answer = 'Wampa'
        answer7.correct = false
        answer7.question = question2
        const answer8 = new Answer()
        answer8.answer = 'Reek'
        answer8.correct = true
        answer8.question = question2

        question2.answers = [answer5, answer6, answer7, answer8]
        await this.questionRepo.save(question2)

        const question3: Question = new Question()
        question3.question = 'Who killed Han Solo?'

        const answer9 = new Answer()
        answer9.answer = 'Kylo Ren'
        answer9.correct = true
        answer9.question = question3
        const answer10 = new Answer()
        answer10.answer = 'Bib Fortuna'
        answer10.correct = false
        answer10.question = question3
        const answer11 = new Answer()
        answer11.answer = 'Jabba the Hutt'
        answer11.correct = false
        answer11.question = question3
        const answer12 = new Answer()
        answer12.answer = 'Supreme Leader Snoke'
        answer12.correct = false
        answer12.question = question3

        question3.answers = [answer9, answer10, answer11, answer12]
        await this.questionRepo.save(question3)

        return;
    }
}