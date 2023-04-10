import clsx from "clsx"

interface PromptProps {
    question: string,
    choices: {
        id: number,
        answer: string
    }[],
    selection: number,
    onSelect: (id: number) => void
}
export default function Prompt({ question, choices, selection, onSelect }: PromptProps): JSX.Element {
    return (

        <div className="flex flex-col justify-center items-center space-y-base">
            <h1>{question}</h1>
            <form className="flex flex-col space-y-base">
                {choices.map(answer =>
                    <button key={answer.id}
                        type='button'
                        className={
                            clsx('rounded border px-md py-sm font-semibold',
                                {
                                    'bg-white text-black': selection === answer.id,
                                    'hover:bg-white hover:text-black': selection !== answer.id
                                })}
                        onClick={() => onSelect(answer.id)}
                    >
                        {answer.answer}
                    </button>
                )}
            </form>

        </div >
    )

}