import FormField from "@/components/forms/formField";
import { useUser } from "@/providers/user/provider";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";

export default function LoginPage(): JSX.Element {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();
    const { setUserState } = useUser();
    const handleLogin = useCallback(async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            const user = response.data
            setUserState(user)
            router.push('/quiz')
        } catch (err) {
            console.log(err)
            if (err instanceof AxiosError) {
                toast.error('Invalid credentials', {
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
    }, [password, router, setUserState, username])
    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-col justify-center items-center">
                <h1>
                    Login with your account
                </h1>
                <form className="flex flex-col space-y-base" onSubmit={handleLogin}>
                    <FormField label="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    <FormField label="Password" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <span>Do not have an account? <Link href='/register' className="underline text-blue-500">Register</Link></span>
                    <button type='submit' className="py-sm bg-blue-500 hover:bg-blue-600 rounded-full">Register</button>
                </form>
            </div>
        </div>
    )
}