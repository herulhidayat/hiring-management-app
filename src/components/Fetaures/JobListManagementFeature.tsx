import { AccessTime, Assignment, AssignmentOutlined, Description, DescriptionOutlined, VideoCameraFront, VideoCameraFrontOutlined, Work, WorkOutline } from "@mui/icons-material"
import ButtonCustom from "../Button/ButtonCustom"
import { BadgeCustomOutline, BadgeDefaultOutline } from "../Styled/badge.styled"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import api from "@/services/api.service";
import { API_PATH } from "@/services/_path.service";
import { useRouter } from "next/router";
import { Skeleton } from "@mui/material";
import NoDataMessage from "../Message/NoDataMessage";

interface Props {
  trigger: any
}

function JobListManagement({ trigger }: Props) {
  const router = useRouter();

  const dataLists = useQuery({
    queryKey: ["job", trigger],
    queryFn: async () => {
      const response = await api.get(
        `${API_PATH().job}?select=*`,
      );

      return response.data;
    },
  });

  return (
    <div className="flex flex-col gap-4" style={{ height: 'calc(100vh - 8.5rem)' }}>
      <div className="flex flex-col gap-4 pr-2 overflow-y-auto">
        {dataLists.isLoading && (
          <div className="flex flex-col gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton variant="rounded" height={"13rem"} />
            ))}
          </div>
        )}
        {(dataLists.isError) && (
          <NoDataMessage type="job_management" />
        )}
        {(!dataLists.isLoading && !dataLists.isError) && dataLists.data?.map((item: any, index: number) => (
          <div key={index} className={`p-2`}>
            <div className="flex flex-col gap-3 p-6 cursor-pointer rounded-2xl shadow-[0px_4px_8px_rgba(0,0,0,0.1)]">
              <div className="flex gap-2 items-start">
                <BadgeDefaultOutline color={ item.status === "active" ? "success" : item.status === "inactive" ? "danger" : "warning"} className="capitalize">{item.status}</BadgeDefaultOutline>
                <BadgeCustomOutline color={"var(--color-neutral-70)"} className="capitalize">{item.list_card.started_on_text}</BadgeCustomOutline>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-bold">
                  {item.title}
                </p>
                <p className="text-base text-neutral-80">
                  {item.job_type}
                </p>
                <p className="text-base text-neutral-80">
                  {item.salary_range.display_text}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1">
                    <div className='text-xs/normal flex gap-1 items-center text-neutral-70 w-[5rem]'>
                      <AccessTime sx={{ fontSize: '1rem' }} />
                      Applied
                    </div>
                    <p className='text-xs/normal font-bold text-primary ps-[1px]'>0</p>
                  </div>
                  <div className="border-s border-neutral-40"></div>
                  <div className="flex flex-col gap-1">
                    <div className='text-xs/normal flex gap-1 items-center text-neutral-70 w-[5rem]'>
                      <AssignmentOutlined sx={{ fontSize: '1rem' }} />
                      Test
                    </div>
                    <p className='text-xs/normal font-bold text-primary ps-[1px]'>0</p>
                  </div>
                  <div className="border-s border-neutral-40"></div>
                  <div className="flex flex-col gap-1">
                    <div className='text-xs/normal flex gap-1 items-center text-neutral-70 w-[5rem]'>
                      <VideoCameraFrontOutlined sx={{ fontSize: '1rem' }} />
                      Interview
                    </div>
                    <p className='text-xs/normal font-bold text-primary ps-[1px]'>0</p>
                  </div>
                  <div className="border-s border-neutral-40"></div>
                  <div className="flex flex-col gap-1">
                    <div className='text-xs/normal flex gap-1 items-center text-neutral-70 w-[5rem]'>
                      <DescriptionOutlined sx={{ fontSize: '1rem' }} />
                      Offering
                    </div>
                    <p className='text-xs/normal font-bold text-primary ps-[1px]'>0</p>
                  </div>
                  <div className="border-s border-neutral-40"></div>
                  <div className="flex flex-col gap-1">
                    <div className='text-xs/normal flex gap-1 items-center text-neutral-70 w-[5rem]'>
                      <WorkOutline sx={{ fontSize: '1rem' }} />
                      Hired
                    </div>
                    <p className='text-xs/normal font-bold text-primary ps-[1px]'>0</p>
                  </div>
                </div>
                <ButtonCustom optionsConfig={{ onClick: () => {router.push({ pathname: `/jobs-management/${item.id}`, query: {title: item.title} })} }}>
                  {item.list_card.cta}
                </ButtonCustom>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const queryClient = new QueryClient();

export default function JobListManagementFeature({ trigger }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <JobListManagement trigger={trigger}/>
    </QueryClientProvider>
  )
}
