import { Typography } from "@mui/material";
import Image from "next/image";

interface INoDataProps {
    text?: string
    desc?: string
}
export default function NoData({ text = "We couldn't find any PokèDex", desc = "Please try again later" }: INoDataProps) {
    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <Image src="/assets/pikachu-cry.png" width={200} height={200} alt="404" />
            <Typography variant="h3" sx={{ fontSize: "1.33rem", fontWeight: 600, color: "var(--color-gray-500)" }}>
                {text}
            </Typography>
            <p className="text-xl text-gray-500">{desc}</p>
        </div>
    )
}