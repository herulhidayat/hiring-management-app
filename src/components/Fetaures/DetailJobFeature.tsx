import Image from "next/image"
import { CardDefault } from "../Styled/card.styled"
import { BadgeDefault } from "../Styled/badge.styled"
import BadgeCheckIcon from "../Icons/BadgeCheckIcon"
import ButtonCustom from "../Button/ButtonCustom"
import { useRouter } from "next/router"
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from 'remark-gfm';

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
                  <p className="text-base/relaxed text-neutral-70">{data.company}</p>
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
        <div className="text-sm">
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {data.job_description}
          </Markdown>
        </div>
      </div>
    </CardDefault>
  )
}