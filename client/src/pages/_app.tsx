import Header from '@/components/header'
import UserProvider from '@/providers/user/provider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ToastContainer />
      <main className='flex flex-col min-h-screen px-sm'>
        <Header />
        <Component {...pageProps} />
      </main>
    </UserProvider>
  )
}
