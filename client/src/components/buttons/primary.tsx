import { HTMLAttributes } from "react";

interface PrimaryButtonProps extends HTMLAttributes<HTMLButtonElement> {

}
export default function PrimaryButton(props: PrimaryButtonProps): JSX.Element {
    return (
        <button className="px-base py-sm bg-blue-500 hover:bg-blue-600 rounded-full" {...props} />
    )
}