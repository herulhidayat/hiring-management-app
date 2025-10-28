import ButtonCustom from "@/components/Button/ButtonCustom";
import JobListManagementFeature from "@/components/Fetaures/JobListManagementFeature";
import JobStatisticFeature from "@/components/Fetaures/JobStatisticFeature";
import { Container, Grid } from "@mui/material";
import styled from "styled-components";

export default function JobsPage() {
  return (
    <>
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
                <ButtonCustom>
                  Create New Job
                </ButtonCustom>
              </CardCreateJob>
              <JobStatisticFeature />
            </div>
          </Grid>
        </Grid>
      </Container>
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