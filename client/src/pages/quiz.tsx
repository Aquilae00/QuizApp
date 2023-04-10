import PrimaryButton from "@/components/buttons/primary";
import SecondaryButton from "@/components/buttons/secondary";
import Prompt from "@/components/prompt";
import ResultSummary from "@/components/summary";
import { useUser } from "@/providers/user/provider";
import { QuestionRO, ResultRO } from "@/types";
import axios, { AxiosError } from 'axios';
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
export default function QuizPage(): JSX.Element {
    const [questions, setQuestions] = useState<QuestionRO[]>([]);
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const [currIndex, setCurrIndex] = useState(0)
    const [result, setResult] = useState<ResultRO>()
    const router = useRouter();
    const { user } = useUser();

    const validateResult = useCallback(async () => {
        try {
            const payload = { answers: Object.entries(answers).map(e => ({ questionId: Number(e[0]), answerId: e[1] })) }
            const response = await axios.post('/api/questions/validate', payload);
            const resultRO = response.data
            setResult(resultRO)
        } catch (err) {
            console.log(err);
            if (err instanceof AxiosError && err.response?.status === 401) {
                router.push('/login')
            }
        }
    }, [answers, router])

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('/api/questions');
                const questionsRO = response.data
                setQuestions(questionsRO)
            } catch (err) {
                console.log(err);
                if (err instanceof AxiosError && err.response?.status === 401) {
                    router.push('/login')
                }
            }
        }
        fetchQuestions();
    }, [router])

    if (!user) {
        return <></>
    }
    return (
        <div className="flex flex-1 items-center justify-center mb-lg">
            {result ?
                <ResultSummary result={result} />
                :
                <div className="flex flex-col items-center justify-center  lg:w-3/4 my-lg">
                    <span>{currIndex + 1} / {questions.length}</span>
                    {questions.length && <Prompt
                        question={questions[currIndex].question}
                        choices={questions[currIndex].answers}
                        onSelect={(id: number) => {
                            if (currIndex < questions.length - 1) {
                                setCurrIndex(prev => prev + 1)
                            };
                            setAnswers(prev => ({ ...prev, [questions[currIndex].id]: id }));
                        }}
                        selection={answers[questions[currIndex].id]}
                    />}

                    <div className="flex justify-between items-center space-x-md my-lg">
                        <SecondaryButton onClick={() => {
                            if (currIndex === 0) return
                            setCurrIndex(prev => prev - 1)
                        }}>Go back</SecondaryButton>
                        <PrimaryButton onClick={
                            validateResult
                        }>Submit</PrimaryButton>
                    </div>
                </div>
            }
        </div>
    )
}