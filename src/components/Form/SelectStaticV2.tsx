import { get } from 'lodash';
import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

export default function SelectStatic({
  control,
  errors,
  fieldName,
  placeholder='Pilih...',
  options,
  defaultValue='',
  className='',
  required=false,
  isClearable = false,
  additionalOptions = {},
}: ISelectStatic) {
  return (
    <>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={fieldName}
        rules={{
          required: required,
        }}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            className={className}
            placeholder={placeholder}
            styles={ReactSelectStyle}
            classNamePrefix={`${get(errors, fieldName) ? 'is-invalid' : ''}`}
            ref={ref}
            value={options.filter((c: any) => c.value == value)}
            onChange={(val: any) => onChange(val?.value)}
            options={options}
            isClearable={isClearable}
            {...additionalOptions}
          />
        )}
      />
    </>
  );
}

type OptionSelect = {
  label: string;
  value: string | number | any;
}
interface ISelectStatic {
  control: any;
  errors: any;
  fieldName: string;
  placeholder?:string;
  options: OptionSelect[];
  defaultValue?:any
  className?:string
  required?:boolean
  isClearable?:boolean,
  additionalOptions?: any,
  styles?: any
}

const ReactSelectStyle = {
  control: (styles: any, { isDisabled }: any) => ({
    ...styles,
    backgroundColor: isDisabled ? "var(--color-neutral-20)" : "var(--color-white)",
    borderColor: "var(--color-neutral-40)",
    color: "$input-color",
    padding: "0.33rem 0.8rem",
    borderRadius: "0.57143rem",
    boxShadow: "none",
    borderWidth: "1px",
    "&:focus": {
      ...styles[":focus"],
      borderColor: "var(--color-primary)",
      boxShadow: "0 0 0 0.25rem var(--color-primary-surface)",
    },
    ":hover": {
      ...styles[":hover"],
      borderColor: 'var(--color-primary-hover)',
    },
    ":active": {
      ...styles[":active"],
      borderColor: 'var(--color-primary)',
    },
    minHeight: "30px",
  }),
  input: (styles: any) => ({
    ...styles,
    color: "var(--color-neutral-90)",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "1.5rem",
    margin: "0",
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "var(--color-neutral-60)",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "1.5rem",
  }),
  valueContainer: (styles: any) => ({
    ...styles,
    padding: "0",
  }),
  indicatorSeparator: (styles: any) => ({
    ...styles,
    backgroundColor: "transparent",
    marginTop: "6px",
    marginBottom: "6px",
  }),
  indicatorsContainer: (styles: any) => ({
    ...styles,
    color: "var(--color-neutral-100)",
    padding: "0",
  }),
  indicatorContainer: (styles: any) => ({
    ...styles,
    padding: ".5rem",
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: "var(--color-neutral-100)",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "1.5rem",
  }),
  multiValue: (styles: any) => ({
    ...styles,
    color: "var(--color-neutral-100)",
    backgroundColor: "var(--color-neutral-20)",
    fontWeight: "500",
  }),
  multiValueLabel: (styles: any) => ({
    ...styles,
    color: "var(--color-neutral-500)",
    backgroundColor: "var(--color-neutral-20)",
    fontWeight: "500",
  }),
  multiValueRemove: (styles: any) => ({
    ...styles,
    color: "var(--color-neutral-500)",
    backgroundColor: "var(--color-neutral-70)",
    ":hover": {
      color: "var(--color-neutral-100)",
      backgroundColor: "var(--color-primary-300)",
    },
  }),
  menu: (styles: any) => ({
    ...styles,
    backgroundColor: "var(--color-white)",
  }),
  option: (styles: any) => ({
    ...styles,
    backgroundColor: "var(--color-white)",
    color: "var(--color-neutral-100)",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "1.5rem",
    ":hover": {
      ...styles[":hover"],
      backgroundColor: "var(--color-primary-surface)",
    },
    ":focus": {
      ...styles[":focus"],
      backgroundColor: "var(--color-primary-surface)",
    },
  }),
};