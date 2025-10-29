'use client';

import DetailJobFeature from "@/components/Fetaures/DetailJobFeature";
import JobListFeature from "@/components/Fetaures/JobListFeature";
import { Container, Grid } from "@mui/material";
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Header from "@/components/Navbar/Header";

 function HomePage() {
  const [selected, setSelected] = useState<any>({});
  return (
    <>
      <section className="sticky top-0 z-50">
        <Header title="Jobs List" />
      </section>
      <Container sx={{mt:5}} className="font-sans">
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
