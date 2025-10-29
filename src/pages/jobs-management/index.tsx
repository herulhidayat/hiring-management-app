import ButtonCustom from "@/components/Button/ButtonCustom";
import FormAddJobFeature from "@/components/Fetaures/FormAddJobFeature";
import JobListManagementFeature from "@/components/Fetaures/JobListManagementFeature";
import JobStatisticFeature from "@/components/Fetaures/JobStatisticFeature";
import Header from "@/components/Navbar/Header";
import { CardDefault } from "@/components/Styled/card.styled";
import { Close } from "@mui/icons-material";
import { Container, Grid, Modal } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

export default function JobsPage() {
  const [modalAddJob, setModalAddJob] = useState<boolean>(false);
  return (
    <>
      <section className="sticky top-0 z-50">
        <Header />
      </section>

      <Container sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid size={9}>
            <JobListManagementFeature />
          </Grid>
          <Grid size={3}>
            <div className="flex flex-col gap-6">
              <CardCreateJob className="p-6 flex flex-col gap-6">
                <div className="overlay"></div>
                <div className="flex flex-col gap-1 justify-center">
                  <p className="text-base/relaxed font-bold text-neutral-10">
                    Recruit the best candidates
                  </p>
                  <p className="text-xs/relaxed text-neutral-10">
                    Create jobs, invite, and hire with ease
                  </p>
                </div>
                <ButtonCustom optionsConfig={{ onClick: () => setModalAddJob(true) }}>
                  Create New Job
                </ButtonCustom>
              </CardCreateJob>
              <JobStatisticFeature />
            </div>
          </Grid>
        </Grid>
      </Container>

      <Modal
        open={modalAddJob}
        onClose={() => setModalAddJob(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CardDefault className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-10 w-3/4 md:w-1/2">
          <div className="flex flex-col gap-0">
            <div className="flex justify-between p-6 border-b border-neutral-40">
              <div className="flex flex-col gap-0">
                <h4 className="text-xl font-bold text-neutral-100">Job Opening</h4>
              </div>
              <div className="cursor-pointer" onClick={() => setModalAddJob(false)}>
                <Close />
              </div>
            </div>
            <div className="p-6 pe-4 overflow-y-auto max-h-[calc(100vh-12.5rem)] me-1">
              <FormAddJobFeature />
            </div>
            <div className="flex justify-end p-6 border-t border-neutral-40">
              <ButtonCustom optionsConfig={{
                type: 'submit',
              }}>
                Publish Job
              </ButtonCustom>
            </div>
          </div>
        </CardDefault>
      </Modal>
    </>
  )
}

const CardCreateJob = styled.div`
  background-image: url('/assets/bg_illustration.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 1rem;
  width: 100%;
  position: relative;
  z-index: 0;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    z-index: -1;
  }
`