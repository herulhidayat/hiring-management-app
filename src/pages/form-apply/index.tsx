import CameraCapture from "@/components/Form/CameraCapure";
import { Container } from "@mui/material";

export default function FormApply() {
    return (
        <Container sx={{mt:5}}>
            <div className="border border-neutral-40 p-10 bg-neutral-10">
                <CameraCapture />
            </div>
        </Container>
    )
}