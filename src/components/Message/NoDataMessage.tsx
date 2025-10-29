import Image from "next/image";
import ButtonCustom from "../Button/ButtonCustom";
import { useRouter } from "next/router";

interface Props {
    type: 'candidate' | 'job' | 'job_management'
    isButton?: boolean
    buttonText?: string
    buttonPath?: string
}
export default function NoDataMessage({ type, isButton, buttonText, buttonPath }: Props) {
    const router = useRouter();

    const config = {
        candidate: {
            image: "/assets/empty_candidate.png",
            text: "No candidates found",
            desc: "Share your job vacancies so that more candidates will apply."
        },
        job: {
            image: "/assets/empty_job.png",
            text: "No job openings available",
            desc: "Please wait for the next batch of openings."
        },
        job_management: {
            image: "/assets/empty_job.png",
            text: "No job openings available",
            desc: "Create a job opening now and start the candidate process."
        }
    }
    return(
        <div className="flex flex-col justify-center items-center gap-4">
            <Image src={config[type].image} width={200} height={200} alt="success" />
            <div className="flex flex-col gap-0 justify-center items-center">
                <p className="text-2xl font-bold text-center">{config[type].text}</p>
                <p className="text-base w-2/3 text-center">{config[type].desc}</p>
            </div>
            {isButton && 
                <ButtonCustom
                    color="var(--color-neutral-90)"
                    bgColor="var(--color-secondary)"
                    bgColorHover="var(--color-secondary-hover)" 
                    optionsConfig={{
                    onClick: () => {
                        router.push(buttonPath || '/');
                    }
                    }}
                >{buttonText}</ButtonCustom>
            }
        </div>
    )
}