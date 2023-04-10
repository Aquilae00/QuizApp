import { useUser } from "@/providers/user/provider";
import axios from 'axios';
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import SecondaryButton from "../buttons/secondary";

export default function Header(): JSX.Element {
    const { user } = useUser();
    const router = useRouter();
    const { setUserState } = useUser();
    const handleLogout = useCallback(async () => {
        try {
            await axios.patch('/api/auth/logout')
            setUserState(null)
            router.push('/')
        } catch (err) {
            console.log(err);
        }
    }, [router, setUserState])
    return (
        <div className='flex lg:px-lg justify-between items-center'>
            <Link href='/'><h1 className='hover:text-blue-500'>StarWardle</h1></Link>
            {user ?
                <SecondaryButton onClick={handleLogout}>Logout</SecondaryButton>
                :
                <SecondaryButton onClick={() => router.push('/register')}>Register</SecondaryButton>}
        </div>)
}