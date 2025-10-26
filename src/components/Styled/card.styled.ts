import styled from 'styled-components';

export const CardItem = styled.div`
    border: 1px solid var(--color-neutral-40);
    margin: 1px;
    border-radius: 0.5rem;

    &.focus {
        border: 2px solid var(--color-primary);
        background-color: var(--color-primary-surface);
        margin: 0;
    }

    &:hover {
        border: 2px solid var(--color-primary-hover);
        background-color: var(--color-primary-surface);
        margin: 0;
    }
`


export const CardDefault = styled.div`
    border: 1px solid var(--color-neutral-40);
    border-radius: 0.5rem;
`