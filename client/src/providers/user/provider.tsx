import assert from "assert";
import { createContext, useContext, ReactNode, useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from 'axios'

export const UserContext = createContext<{
    user: { id: string, username: string } | null;
    setUserState: Dispatch<SetStateAction<{
        id: string;
        username: string;
    } | null>>
} | null>(null);
export function useUser() {
    const ctx = useContext(UserContext);
    assert(ctx);
    return ctx;
}

export default function UserProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [userState, setUserState] = useState<{ id: string, username: string } | null>(null);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await axios.get('/api/auth/me');
                const data = response.data
                setUserState(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchMe();
    }, [])

    return (
        <UserContext.Provider value={{ user: userState, setUserState }}>
            {children}
        </UserContext.Provider>
    );
}
