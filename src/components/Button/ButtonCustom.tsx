import { Button } from "@mui/material";

interface Props {
    children: React.ReactNode
    color?: string
    bgColor?: string
    bgColorHover?: string
    optionsConfig?: any
    styleConfig?: any
}

export default function ButtonCustom({
    children,
    color = 'var(--color-white)',
    bgColor = 'var(--color-primary)',
    bgColorHover = 'var(--color-primary-hover)',
    optionsConfig,
    styleConfig
}: Props) {
    return (
        <Button 
            variant="contained" 
            size="small" 
            sx={{ 
                padding: '0.25rem 1rem', 
                borderRadius: '0.5rem', 
                textTransform: 'capitalize',
                backgroundColor: bgColor,
                color: color,
                '&:hover': {
                    backgroundColor: bgColorHover,
                    boxShadow: 'none'
                },
                boxShadow: 'none',
                fontWeight: '500',
                fontSize: '0.875rem',
                ...styleConfig
            }}
            {...optionsConfig}
        >
            {children}
        </Button>
    )
}