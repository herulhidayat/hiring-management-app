'use client';

import DetailJobFeature from "@/components/Fetaures/DetailJobFeature";
import JobListFeature from "@/components/Fetaures/JobListFeature";
import { Container, Grid } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState<any>({});
  return (
    <>
      <Container sx={{mt:5}}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <JobListFeature callbackSelected={setSelected} />
          </Grid>
          <Grid size={8}>
            <DetailJobFeature data={selected} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
