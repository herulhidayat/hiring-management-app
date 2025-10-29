import Image from "next/image";
import ButtonCustom from "../Button/ButtonCustom";
import { useRouter } from "next/router";

export default function SuccessMessage() {
    const router = useRouter();
    return(
        <div className="flex flex-col justify-center items-center gap-4">
            <Image src="/assets/Verified.png" width={200} height={200} alt="success" />
            <div className="flex flex-col gap-0 justify-center items-center">
                <p className="text-2xl font-bold text-center">🎉 Your application was sent!</p>
                <p className="text-base w-2/3 text-center">Congratulations! You've taken the first step towards a rewarding career at Rakamin. We look forward to learning more about you during the application process.</p>
            </div>
            <ButtonCustom optionsConfig={{ onClick: () => router.push('/') }}>Back to Home</ButtonCustom>
        </div>
    )
}