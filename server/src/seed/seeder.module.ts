import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Answer } from "src/answer/answer.entity";
import { Question } from "src/question/question.entity";
import { TypeOrmConfigService } from "src/typeorm/typeorm.service";
import { Seeder } from "./seeder";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([Question, Answer])],
    providers: [Seeder, Logger]
})
export class SeederModule { }