import NoDataMessage from "@/components/Message/NoDataMessage";
import Header from "@/components/Navbar/Header";
import { CardDefault } from "@/components/Styled/card.styled";
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { Container } from "@mui/material";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useRouter } from "next/router";
import { useReducer, useState } from "react";

type Candidate = {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  domicile: string;
  gender: string;
  linkedin_link: string;
}

const columnHelper = createColumnHelper<Candidate>()


function CandidateList() {
  const [data, setData] = useState<Candidate[]>(() => [])
  const rerender = useReducer(() => ({}), {})[1]
  const router = useRouter();
  const [selected, setSelected] = useState<any>([])
  const jobId = typeof router.query.id === 'string' ? router.query.id : undefined;
  const jobTitle = typeof router.query.title === 'string' ? router.query.title : '';

  const columns = [
    columnHelper.accessor('full_name', {
      header: () => <div
        className="flex items-center gap-2"
      >
        <input
          type="checkbox"
          checked={selected.length === data.length}
          onChange={(e) => {
            if (e.target.checked) {
              setSelected(data.map((item: any) => item.id))
            } else {
              setSelected([])
            }
          }} />
        Nama Lengkap
      </div>,
      cell: (info) => <div
        className="flex items-center gap-2"
      >
        <input
          type="checkbox"
          checked={selected.includes(info.row.original.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelected([...selected, info.row.original.id])
            } else {
              setSelected(selected.filter((item: any) => item !== info.row.original.id))
            }
          }
          } />
        {info.getValue()}
      </div>,
    }),
    columnHelper.accessor('email', {
      header: 'Email',
    }),
    columnHelper.accessor('phone_number', {
      header: 'No. Telepon',
    }),
    columnHelper.accessor('date_of_birth', {
      header: 'Tanggal Lahir',
    }),
    columnHelper.accessor('domicile', {
      header: 'Domisili',
    }),
    columnHelper.accessor('gender', {
      header: 'Jenis Kelamin',
    }),
    columnHelper.accessor('linkedin_link', {
      header: 'Linkedin',
      cell: (info) => <a href={info.getValue()} target="_blank" rel="noopener noreferrer" className="text-primary">{info.getValue()}</a>,
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const dataLists = useQuery({
    queryKey: [API_PATH().applied, jobId],
    enabled: !!jobId,
    queryFn: async () => {
      if (!jobId) {
        return [];
      }
      const response = await api.get(
        `${API_PATH().applied}`,
        {
          params: {
            job_id: `eq.${jobId}`
          }
        }
      );

      setData(response.data.map((item: any) => {
        return {
          id: item.id,
          full_name: item.full_name,
          email: item.email,
          phone_number: item.phone_number,
          date_of_birth: item.date_of_birth,
          domicile: item.domicile,
          gender: item.gender,
          linkedin_link: item.linkedin_link,
        }
      }))
      return response.data;
    },
  });

  return (
    <>
      <section className="sticky top-0 z-50">
        <Header title="Candidates List" />
      </section>

      <Container sx={{ mt: 5 }} className="font-sans">
        <div className="h-full flex flex-col gap-6">
          <h2 className="text-lg font-bold">{jobTitle}</h2>
          {dataLists.isLoading && <div>Loading...</div>}
          {!dataLists.isLoading && (dataLists.isError || data.length === 0) &&
            <div className="h-full justify-center items-center">
              <NoDataMessage type="candidate" />
            </div>
          }
          {(!dataLists.isLoading && !dataLists.isError && data.length > 0) && (
            <CardDefault className="p-6">
              <table className="w-full">
                <thead className="bg-neutral-20">
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id} className="p-4 uppercase text-xs font-bold">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-neutral-20">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="p-4 text-sm text-neutral-90 border-b border-neutral-40">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardDefault>
          )}
        </div>
      </Container>
    </>
  )
}

const queryClient = new QueryClient();

export default function CandidateListPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <CandidateList />
    </QueryClientProvider>
  );
}
