import styled from "styled-components";

export const FormLabel = styled.label`
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.25rem;
`

export const FormControl = styled.input`
    width: 100%;
    height: 3rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-neutral-40);
    padding: 0.5rem 1rem;

    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.5rem;

    &::placeholder {
        color: var(--color-neutral-60);
    }

    &:focus {
        border: 1px solid var(--color-primary);
        outline-color: var(--color-primary-focus);
        box-shadow: 0 0 0 2px var(--color-primary-surface);
    }

    &:hover {
        border: 1px solid var(--color-primary-hover);
    }

    &.error {
        border: 1px solid var(--color-danger);
    }

    &.success {
        border: 1px solid var(--color-success);
    }

    &.warning {
        border: 1px solid var(--color-warning);
    }
`

export const FormControlTextArea = styled.textarea`
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid var(--color-neutral-40);
    padding: 0.5rem 1rem;

    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.5rem;

    &::placeholder {
        color: var(--color-neutral-60);
    }

    &:focus {
        border: 1px solid var(--color-primary);
        outline-color: var(--color-primary-focus);
        box-shadow: 0 0 0 2px var(--color-primary-surface);
    }

     &:hover {
        border: 1px solid var(--color-primary-hover);
    }

    &.error {
        border: 1px solid var(--color-danger);
    }

    &.success {
        border: 1px solid var(--color-success);
    }

    &.warning {
        border: 1px solid var(--color-warning);
    }
`

export const FormErrorLabel = styled.label`
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.25rem;
    color: var(--color-danger);
`