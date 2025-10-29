'use client';

import DetailJobFeature from "@/components/Fetaures/DetailJobFeature";
import JobListFeature from "@/components/Fetaures/JobListFeature";
import { Container, Grid } from "@mui/material";
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

 function HomePage() {
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


const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
}
