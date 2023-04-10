import { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
}
export default function FormField({ label, ...props }: FormFieldProps): JSX.Element {
    return (
        <fieldset className="flex flex-col space-y-sm">
            <label className="font-semibold">{label}</label>
            <input className="bg-neutral-700 rounded w-full px-sm py-xs" {...props}></input>
        </fieldset>
    )
}