import ButtonCustom from "@/components/Button/ButtonCustom";
import FormAddJobFeature from "@/components/Fetaures/FormAddJobFeature";
import JobListManagementFeature from "@/components/Fetaures/JobListManagementFeature";
import JobStatisticFeature from "@/components/Fetaures/JobStatisticFeature";
import Header from "@/components/Navbar/Header";
import { CardDefault } from "@/components/Styled/card.styled";
import { CheckCircle, Close } from "@mui/icons-material";
import { Container, Grid, Modal, Snackbar } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

export default function JobsPage() {
  const [modalAddJob, setModalAddJob] = useState<boolean>(false);
  const [snackbarNotify, setSnackbarNotify] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<number>(0);
  return (
    <>
      <section className="sticky top-0 z-50">
        <Header title="Jobs Management" />
      </section>

      <Container sx={{ mt: 5 }} className="font-sans">
        <Grid container spacing={2}>
          <Grid size={9}>
            <JobListManagementFeature trigger={trigger}/>
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
        <FormAddJobFeature 
          handleCloseModal={() => setModalAddJob(false)} 
          callbackSuccess={() => {
            setSnackbarNotify(true)
            setTrigger(trigger + 1)
          }} 
        />
      </Modal>

      <Snackbar
        open={snackbarNotify}
        autoHideDuration={5000}
        onClose={() => setSnackbarNotify(false)}
      >
        <div className="flex justify-between gap-6 bg-neutral-10 p-4 rounded-lg border-l-4 border-primary shadow">
          <div className="flex items-center gap-2 text-neutral-90">
            <CheckCircle sx={{ fontSize: '1.5rem', color: 'var(--color-primary)' }} />
            <p className="font-bold text-sm">Job vacancy successfully created</p>
          </div>
          <div className="cursor-pointer"><Close onClick={() => setSnackbarNotify(false)} /></div>
        </div>
      </Snackbar>
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