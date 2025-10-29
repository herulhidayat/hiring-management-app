'use client';

import Image from "next/image"
import { CardDefault } from "../Styled/card.styled"
import { BadgeDefault } from "../Styled/badge.styled"
import BadgeCheckIcon from "../Icons/BadgeCheckIcon"
import ButtonCustom from "../Button/ButtonCustom"
import { useRouter } from "next/router"
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from 'remark-gfm';
import { getItem } from "../Helper/localstorage.helper"
import { Skeleton } from "@mui/material"
import { size } from "lodash"

interface Props {
  data: any
}

export default function DetailJobFeature({data}: Props) {
  const router = useRouter();
  const user = getItem('user')
  return(
    <CardDefault className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="flex gap-6">
            <div>
              {Boolean(size(data)) ? (
                <Image src="/assets/logo-default.png" width={48} height={48} alt="logo-company" />
              ) : (
                <Skeleton variant="rounded" width={48} height={48} />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-fit">
                {Boolean(size(data)) ? (
                  <BadgeDefault color={'success'} className="capitalize">{data.job_type}</BadgeDefault>
                ) : (
                  <Skeleton variant="rounded" width={60} height={24} />
                )}
              </div>
              <div className="flex flex-col gap-0">
                {Boolean(size(data)) ? (
                  <h1 className="text-lg/relaxed font-bold text-neutral-90">{data.title}</h1>
                ) : (
                  <Skeleton variant="rounded" width={200} height={24} />
                )}
                {Boolean(size(data)) ? (
                  <div className="flex gap-1 items-center">
                    <p className="text-base/relaxed text-neutral-70">{data.company}</p>
                    <div className="text-primary"><BadgeCheckIcon /></div>
                  </div>
                ) : (
                  <Skeleton variant="rounded" className="mt-1" width={100} height={18} />
                )}
              </div>
            </div>
          </div>
          <div>
            {user?.role !== 'admin' && (
              <ButtonCustom 
                color="var(--color-neutral-90)"
                bgColor="var(--color-secondary)"
                bgColorHover="var(--color-secondary-hover)" 
                optionsConfig={{
                  onClick: () => {
                    if(!user) {
                      router.push({
                        pathname: '/login',
                        query: {
                          redirect: `/form-apply?id=${data.id}`,
                        }
                      })
                    } else {
                      router.push({
                        pathname: '/form-apply',
                        query: {
                          id: data.id
                        }
                      })
                    }
                  }
                }}
              >
                {user ? 'Apply' : 'Login to Apply'}
              </ButtonCustom>
            )}
          </div>
        </div>
        <div className="border-b border-neutral-40"></div>
        <div className="text-sm">
          {Boolean(size(data)) ? (
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {data.job_description}
            </Markdown>
          ) : (
            <div className="flex flex-col gap-2">
              <Skeleton variant="rounded" width={"100%"} height={24} />
              <Skeleton variant="rounded" width={"100%"} height={24} />
              <Skeleton variant="rounded" width={"100%"} height={24} />
              <Skeleton variant="rounded" width={"50%"} height={24} />
            </div>
          )}
        </div>
      </div>
    </CardDefault>
  )
}