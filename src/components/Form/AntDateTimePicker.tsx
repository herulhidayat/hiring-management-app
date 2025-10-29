import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import React, { useRef } from 'react';
import { FormLabel } from '../Styled/form.styled';
import styled from 'styled-components';

interface AntDateTimePickerProps {
  // label
  labelName?: string | React.ReactNode
  isLabel?: boolean
  labelStyle?: any
  labelClassname?: any

  // datepicker
  picker?: 'week' | 'month' | 'quarter' | 'year'
  disabled?: boolean
  placeholder?: string
  showTime?: boolean
  defaultValue?: any
  className?: any
  style?: any
  disableSelectMin?: { // disable before current date; insert current date
    enable: boolean
    currentDate: number // timestamp
  }
  disableSelectMax?: { // disable current after date; insert current date
    enable: boolean
    currentDate: number // timestamp
  }
  callbackOnChange?: (newValue?: any) => void;
  isClearable?: boolean;
  suffixIcon?: React.ReactNode
  prefix?: React.ReactNode
}

function AntDateTimePicker(props: AntDateTimePickerProps) {

  const dateTimeRef = useRef<any>(nanoid())

  // callback value to parent
  const onChangeTimeframeDate = (value: any) => {
    if (props?.callbackOnChange) props?.callbackOnChange(value)
  };

  // check disable date before or after current date
  const disabledDate = (current: any) => {
    try {
      return current &&
        (props?.disableSelectMin?.enable && current < dayjs(props?.disableSelectMin?.currentDate)) || // disable before current date
        (props?.disableSelectMax?.enable && current > dayjs(props?.disableSelectMax?.currentDate)); // disable after current date
    } catch (error) {
      return true
    }
  };

  // check disabel time before current time
  const disabledDateTime = (current: any) => {
    if (props?.disableSelectMin?.enable && dayjs(current).date() === dayjs(props?.disableSelectMin?.currentDate).date()) {
      return {
        disabledHours: () => range(0, dayjs(props?.disableSelectMin?.currentDate).hour()) || [],
        disabledMinutes: () => range(0, dayjs(props?.disableSelectMin?.currentDate).minute()) || [],
        disabledSeconds: () => range(0, dayjs(props?.disableSelectMin?.currentDate).second() + 1) || [],
      }
    }

    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    }
  }


  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  return (
    <PickerConatiner className='flex flex-col gap-2'>
      {props?.isLabel && (
        <FormLabel>
          {props?.labelName}
        </FormLabel>
      )}

      <DatePicker
        allowClear={props?.isClearable}
        className={props?.className}
        style={props?.style}
        placeholder={props?.placeholder}
        showTime={props?.showTime}
        picker={props?.picker}
        ref={dateTimeRef}
        size="large"
        getPopupContainer={(trigger: any) => trigger.parentElement}
        disabled={props?.disabled}
        value={props?.defaultValue !== 0 ? dayjs(props?.defaultValue) : null}
        defaultValue={props?.defaultValue ? dayjs(props?.defaultValue) : undefined}
        onChange={(date) => {
          onChangeTimeframeDate(date ? date.valueOf() : 0)
        }}
        disabledDate={disabledDate}
        disabledTime={disabledDateTime}
        suffixIcon={props?.suffixIcon}
        prefix={props?.prefix}
      />
    </PickerConatiner>
  )
}

const PickerConatiner = styled.div`
  .ant-picker-input > input {
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.5rem;

    &::placeholder {
        color: var(--color-neutral-60);
    }

  }

  /* .ant-picker {
    &:hover {
        border: 1px solid var(--color-primary-hover);
    }
  } */

  .ant-picker-outlined:hover {
    border-color: var(--color-primary);
  }

  .ant-picker-outlined:focus-within {
    border-color: var(--color-primary);
  }
`

export default AntDateTimePicker;