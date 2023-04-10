import { ResultRO } from "@/types"
import clsx from "clsx"

interface ResultSummaryProps {
    result: ResultRO
}
export default function ResultSummary({ result }: ResultSummaryProps): JSX.Element {
    return (
        <div className="flex flex-col">
            <h1>You scored {result.summary.correctCount} out of {result.summary.questionsCount}</h1>
            <span>Your Summary:</span>
            <div className="flex flex-col space-y-md">
                {result.questions.map((question) =>
                    <div key={question.id} className="flex flex-col">
                        <div className="flex flex-col space-y-base">
                            <div className={clsx("font-semibold", { 'text-green-500': question.isCorrect, 'text-red-500': !question.isCorrect })}>{question.question}</div>
                            {question.answers.map(answer =>
                                <div key={answer.id} className={
                                    clsx('rounded border px-md py-sm font-semibold',
                                        {
                                            'bg-red-400 text-black border-none': question.selection === answer.id && !answer.correct,
                                            'bg-green-400 text-black border-none': answer.correct
                                        })
                                }>{answer.answer}</div>)}
                        </div>
                    </div>)}
            </div>
        </div>
    )
}