import { HTMLAttributes } from "react";

interface SecondaryButtonProps extends HTMLAttributes<HTMLButtonElement> {

}
export default function SecondaryButton(props: SecondaryButtonProps): JSX.Element {
    return (
        <button className="px-base py-sm border hover:opacity-90 rounded-full" {...props} />
    )
}