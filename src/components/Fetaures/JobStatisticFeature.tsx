import { ArrowDownward, ArrowUpward, PeopleAltOutlined, TaskAlt, WorkOutline } from "@mui/icons-material";
import { CardDefault } from "../Styled/card.styled";

export default function JobStatisticFeature() {
    return(
        <CardDefault className="flex flex-col gap-0">
            <div className="px-6 py-4 border-b border-neutral-40">
                Statistik
            </div>
            <div className="px-6 py-4">
                <div className="flex flex-col gap-4">
                    <CardDefault className="p-4 flex flex-col gap-1">
                        <div className="flex gap-2 text-sm font-medium text-neutral-80 items-center">
                            <WorkOutline sx={{ fontSize: '1rem', color: 'var(--color-primary)' }} />
                            Lowongan Aktif
                        </div>
                        <div className="flex">
                            <div className="flex-1 flex gap-2 justify-center items-center">
                                <p className="text-lg font-medium">10</p>
                                <p className="text-xs text-neutral-70">Ditampilkan</p>
                            </div>
                            <div className="flex flex-col gap-0 items-end">
                                <div className="flex gap-1 items-center text-primary">
                                    <ArrowUpward sx={{ fontSize: '1rem' }} />
                                    <p className="text-xs">20%</p>
                                </div>
                                <p className="text-xs text-neutral-70">vs. bulan lalu</p>
                            </div>
                        </div>
                    </CardDefault>

                    <CardDefault className="p-4 flex flex-col gap-1">
                        <div className="flex gap-2 text-sm font-medium text-neutral-80 items-center">
                            <PeopleAltOutlined sx={{ fontSize: '1rem', color: 'var(--color-primary)' }} />
                            Kandidat diundang
                        </div>
                        <div className="flex">
                            <div className="flex-1 flex gap-2 justify-center items-center">
                                <p className="text-lg font-medium">6</p>
                                <p className="text-xs text-neutral-70">Terkirim</p>
                            </div>
                            <div className="flex flex-col gap-0 items-end">
                                <div className="flex gap-1 items-center text-primary">
                                    <ArrowUpward sx={{ fontSize: '1rem' }} />
                                    <p className="text-xs">20%</p>
                                </div>
                                <p className="text-xs text-neutral-70">vs. bulan lalu</p>
                            </div>
                        </div>
                    </CardDefault>

                    <CardDefault className="p-4 flex flex-col gap-1">
                        <div className="flex gap-2 text-sm font-medium text-neutral-80 items-center">
                            <TaskAlt sx={{ fontSize: '1rem', color: 'var(--color-primary)' }} />
                            Kandidat diterima
                        </div>
                        <div className="flex">
                            <div className="flex-1 flex gap-2 justify-center items-center">
                                <p className="text-lg font-medium">10</p>
                                <p className="text-xs text-neutral-70">Diproses</p>
                            </div>
                            <div className="flex flex-col gap-0 items-end">
                                <div className="flex gap-1 items-center text-danger">
                                    <ArrowDownward sx={{ fontSize: '1rem' }} />
                                    <p className="text-xs">20%</p>
                                </div>
                                <p className="text-xs text-neutral-70">vs. bulan lalu</p>
                            </div>
                        </div>
                    </CardDefault>

                    <CardDefault className="p-4 flex flex-col gap-1">
                        <div className="flex gap-2 text-sm font-medium text-neutral-80 items-center">
                            <WorkOutline sx={{ fontSize: '1rem', color: 'var(--color-danger)' }} />
                            Lowongan Non-aktif
                        </div>
                        <div className="flex">
                            <div className="flex-1 flex gap-2 justify-center items-center">
                                <p className="text-lg font-medium">10</p>
                                <p className="text-xs text-neutral-70">posisi</p>
                            </div>
                            <div className="flex flex-col gap-0 items-end">
                                <div className="flex gap-1 items-center text-danger">
                                    <ArrowDownward sx={{ fontSize: '1rem' }} />
                                    <p className="text-xs">20%</p>
                                </div>
                                <p className="text-xs text-neutral-70">vs. bulan lalu</p>
                            </div>
                        </div>
                    </CardDefault>
                </div>
            </div>
        </CardDefault>
    )
}