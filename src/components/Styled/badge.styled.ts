import styled from "styled-components";

type BadgeColor = 'success' | 'danger' | 'warning' | 'primary';

const main = (c?: BadgeColor) => c === 'success' ? 'var(--color-success)' : c === 'danger' ? 'var(--color-danger)' : c === 'warning' ? 'var(--color-warning)' : 'var(--color-primary)';
const surface = (c?: BadgeColor) => c === 'success' ? 'var(--color-success-surface)' : c === 'danger' ? 'var(--color-danger-surface)' : c === 'warning' ? 'var(--color-warning-surface)' : 'var(--color-primary-surface)';
const border = (c?: BadgeColor) => c === 'success' ? 'var(--color-success-border)' : c === 'danger' ? 'var(--color-danger-border)' : c === 'warning' ? 'var(--color-warning-border)' : 'var(--color-primary-border)';

export const BadgeDefault = styled.div<{ color?: BadgeColor }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.125rem 0.5rem;
    background-color: ${({ color }) => main(color)};
    color: var(--color-white);
    border-radius: 0.25rem;

    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.5rem;
`

export const BadgeSmall = styled.div<{ color?: BadgeColor }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.125rem 0.5rem;
    background-color: ${({ color }) => main(color)};
    color: var(--color-white);
    border-radius: 0.25rem;

    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.25rem;
`

export const BadgeDefaultOutline = styled.div<{ color?: BadgeColor }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.125rem 0.5rem;
    background-color: ${({ color }) => surface(color)};
    color: ${({ color }) => main(color)};
    border: ${({ color }) => border(color)} 1px solid;
    border-radius: 0.25rem;

    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.5rem;
`

export const BadgeSmallOutline = styled.div<{ color?: BadgeColor }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.125rem 0.5rem;
    background-color: ${({ color }) => surface(color)};
    color: ${({ color }) => main(color)};
    border: ${({ color }) => border(color)} 1px solid;
    border-radius: 0.25rem;

    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.25rem;
`

export const BadgeCustom = styled.div<{ bgColor?: string, color?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.125rem 0.5rem;
    background-color: ${({ bgColor }) => bgColor};
    color: ${({ color }) => color};
    border-radius: 0.25rem;

    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.5rem;
`

export const BadgeCustomOutline = styled.div<{ bgColor?: string, color?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.125rem 0.5rem;
    background-color: ${({ bgColor }) => bgColor};
    color: ${({ color }) => color};
    border: 1px solid ${({ color }) => color} 1px solid;
    border-radius: 0.25rem;

    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.5rem;
`