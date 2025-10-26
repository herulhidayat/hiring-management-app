import Image from "next/image"
import { CardDefault } from "../Styled/card.styled"
import { BadgeDefault } from "../Styled/badge.styled"
import BadgeCheckIcon from "../Icons/BadgeCheckIcon"
import { Button } from "@mui/material"
import ButtonCustom from "../Button/ButtonCustom"
import { useRouter } from "next/router"

interface Props {
  data: any
}

export default function DetailJobFeature({data}: Props) {
  const router = useRouter();
  return(
    <CardDefault className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="flex gap-6">
            <div>
              <Image src="/assets/logo-default.png" width={48} height={48} alt="logo-company" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-fit">
                <BadgeDefault color={'success'} className="capitalize">{data.job_type}</BadgeDefault>
              </div>
              <div className="flex flex-col gap-0">
                <h1 className="text-lg/relaxed font-bold text-neutral-90">{data.title}</h1>
                <div className="flex gap-1 items-center">
                  <p className="text-base/relaxed text-neutral-70">Rakamin</p>
                  <div className="text-primary"><BadgeCheckIcon /></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ButtonCustom 
              color="var(--color-neutral-90)"
              bgColor="var(--color-secondary)"
              bgColorHover="var(--color-secondary-hover)" 
              optionsConfig={{
                onClick: () => {
                  router.push({
                    pathname: '/form-apply',
                    query: {
                      id: data.id
                    }
                  })
                }
              }}
            >
              Apply
            </ButtonCustom>
          </div>
        </div>
        <div className="border-b border-neutral-40"></div>
        <div>
          <ul className="list-disc list-inside text-neutral-80 text-sm/relaxed">
            <li>
              Develope, test, and maintain responsive, high-performance web applications using modern front-end technologies.
            </li>
            <li>
              Collaborate with UI/UX designers to translate wireframes and prototypes into functional code.
            </li>
            <li>
              Integrate front-end components with APIs and backend services.
            </li>
            <li>
              Ensure cross-browser compatibility and optimize applications for maximum speed and scalability.
            </li>
            <li>
              Write clean, reusable, and maintainable code following best practices and coding standards.
            </li>
            <li>
              Participate in code reviews, contributing to continuous improvement and knowledge sharing.
            </li>
            <li>
              Troubleshoot and debug issues to improve usability and overall application quality.
            </li>
            <li>
              Stay updated with emerging front-end technologies and propose innovative solutions.
            </li>
            <li>
              Collaborate in Agile/Scrum ceremonies, contributing to sprint planning, estimation, and retrospectives.
            </li>
          </ul>
        </div>
      </div>
    </CardDefault>
  )
}