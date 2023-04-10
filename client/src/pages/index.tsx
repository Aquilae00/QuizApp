import PrimaryButton from "@/components/buttons/primary";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <h1>Are you a Star Wars fan?</h1>
      <span className="mb-md">Time to test your knowledge</span>
      <PrimaryButton onClick={() => router.push('/quiz')}>Enter the Starwardle</PrimaryButton>
    </div>
  )
}
