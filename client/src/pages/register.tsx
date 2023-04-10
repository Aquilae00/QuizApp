import FormField from "@/components/forms/formField";
import { useUser } from "@/providers/user/provider";
import axios, { AxiosError } from 'axios';
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
export default function RegisterPage(): JSX.Element {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const userCtx = useUser();
    const router = useRouter();
    const handleRegister = useCallback(async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/register', { username, password });
            if (userCtx?.setUserState) {
                userCtx.setUserState(response.data)
            }
            router.push('/quiz')
        } catch (err) {
            console.log(err)
            if (err instanceof AxiosError && err.response?.status === 409) {
                toast.error('User already exists!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            }
        }
    }, [password, router, userCtx, username])

    if (userCtx?.user) {
        router.replace('/quiz')
    }
    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-col justify-center items-center">
                <h1>
                    Register as a user
                </h1>
                <form className="flex flex-col space-y-base" onSubmit={handleRegister}>
                    <FormField label="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    <FormField label="Password" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <span>Already have an account? <Link href='/login' className="underline text-blue-500">Login</Link></span>
                    <button type='submit' className="py-sm bg-blue-500 hover:bg-blue-600 rounded-full">Sign Up</button>
                </form>
            </div>
        </div>
    )
}