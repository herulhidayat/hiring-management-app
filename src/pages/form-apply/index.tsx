import ButtonCustom from "@/components/Button/ButtonCustom";
import FormApplyFeature from "@/components/Fetaures/FormApplyFeature";
import SuccessMessage from "@/components/Message/SuccessMessage";
import ArrowLeftIcon from "@/components/Icons/ArrowLeftIcon";
import Header from "@/components/Navbar/Header";
import { Container, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

export default function FormApply() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  return (
    <>
      <section className="sticky top-0 z-50">
        <Header title="Form Apply" />
      </section>

      {isSuccess ? (
        <Container sx={{mt:5}} className="flex justify-center h-[calc(100vh-8.5rem)] font-sans">
          <div className="flex justify-center items-center">
            <SuccessMessage />
          </div>
        </Container>
      ): (
        <Container sx={{mt:5, mb:5}} className="font-sans">
          <div className="border border-neutral-40 p-10 bg-neutral-10 lg:mx-40">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <ButtonCustom 
                    color="var(--color-neutral-90)"
                    bgColor="var(--color-neutral-10)"
                    bgColorHover="var(--color-neutral-30)" 
                    optionsConfig={{
                      onClick: () => {
                        router.push('/');
                      }
                    }}
                    styleConfig={{
                      border: '1px solid var(--color-neutral-40)',
                      p: 1,
                      minWidth: 'auto',
                    }}
                  >
                    <ArrowLeftIcon />
                  </ButtonCustom>
                  <h3 className="text-lg/relaxed font-bold text-neutral-100">
                    Apply Front End at Rakamin
                  </h3>
                </div>
                <p className="text-sm/relaxed text-neutral-70">ℹ️ This field required to fill</p>
              </div>
              <FormApplyFeature callbackSuccess={(value: any) => setIsSuccess(value)} />
            </div>
          </div>
        </Container>
      )}
    </>
  )
}