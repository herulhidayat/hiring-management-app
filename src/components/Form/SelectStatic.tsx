import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name: string, selected: string, theme: Theme) {
  return {
    fontWeight: selected?.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface ISelectStaticProps {
    placeholder: string;
  deafultValue?: string;
  configData: {key: string, value: string}[];
  callbackSelected: (value: {key: string, value: string}) => void;
  style?:any;
  iconDropDown?: any;
  customPlaceholderIcon?: React.ReactNode;
}

export default function SelectStatic({ placeholder = 'Select...', deafultValue, configData, callbackSelected, style, iconDropDown, customPlaceholderIcon }: ISelectStaticProps) {
  const theme = useTheme();
  const [selected, setSelected] = React.useState<string>();

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value },
    } = event;
    setSelected(value);
    callbackSelected(configData?.find(item => item?.value === value) as {key: string, value: string});
  };

  return (
    <div>
      <FormControl>
        <Select
          displayEmpty
          value={selected}
          onChange={handleChange}
          renderValue={(selected) => {
            if (deafultValue && !selected) {
              return (
                <div className='flex gap-3'>{customPlaceholderIcon}{configData?.find(item => item?.value === deafultValue)?.key}</div>
              );
            }

            if (selected === null || selected === undefined) {
              return (
                <div className='flex gap-3'>{customPlaceholderIcon}<em>{placeholder}</em></div>
              );
            }

            return (
                <div className='flex gap-3'>{customPlaceholderIcon}{configData?.find(item => item?.value === selected)?.key}</div>
            );
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={style}
          IconComponent={iconDropDown}
        >
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
          {configData?.map((item: {key: string, value: string}, index) => (
            <MenuItem
              key={index}
              value={item?.value}
              style={getStyles(item?.value, selected as string, theme)}
            >
              {item?.key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}