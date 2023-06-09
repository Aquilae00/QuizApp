import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Answer } from "./answer.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Answer])],
})
export class AnswerModule { }