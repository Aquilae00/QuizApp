import { Answer } from "src/answer/answer.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @OneToMany(() => Answer, (answer) => answer.question, { cascade: true })
    answers: Answer[]
}