import { Popover } from "@mui/material";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import Image from "next/image";
import { FormControl } from "../Styled/form.styled";
import countryData from "../../../public/assets/CountryCodes.json";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { ExpandMore, Search } from "@mui/icons-material";

interface Props {
  callbackSelected?: (selected: any) => void
}

export default function SelectCountryCode({ callbackSelected }: Props) {
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<any>({});

  const debouncedSearch = debounce(setSearch, 500)

  useEffect(() => {
    const countryFind = countryData.find((item: any) => item.code === "ID")
    setSelected(countryFind)
    if(callbackSelected) {
      callbackSelected(countryFind)
    }
  }, [])
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <div {...bindTrigger(popupState)} className="flex gap-1 items-center cursor-pointer">
            {selected?.code &&
              <Image src={`https://flagsapi.com/${selected?.code}/flat/32.png`} alt="country-flag" className="border border-neutral-40 rounded-full object-cover h-[16px] w-[16px]" height={16} width={16} />
            }
            <ExpandMore />
          </div>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            sx={{
              mt: 1,
              '& .MuiPopover-paper': {
                width: '20rem',
                overflow: 'visible',
                boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.1)',
                border: '1px solid var(--color-neutral-40)',
                borderRadius: '0.5rem',
              },
            }}
          >
            <div className="flex flex-col">
              <div className="border-b border-neutral-40 px-4 py-2">
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 -translate-y-1/2"/>
                  <FormControl style={{height: '2.5rem', paddingLeft: '2.5rem'}} placeholder="Search..." onChange={(e) => debouncedSearch(e.target.value)}/>
                </div>
              </div>
              <div className="ps-4 pe-1 pb-2">
                <div className="flex flex-col gap-2 overflow-y-scroll max-h-[11rem] pe-1">
                  {countryData.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase())).map((item: any, index: number) => (
                    <div className="flex justify-between items-center gap-2 cursor-pointer py-1" key={index} onClick={() => {
                      popupState.close()
                      setSelected(item)
                      if (callbackSelected) callbackSelected(item);
                    }}>
                      <div className="flex gap-2 items-center">
                        <div>
                          <Image src={`https://flagsapi.com/${item?.code}/flat/24.png`} alt="country-flag" className="border border-neutral-40 rounded-full object-cover h-[16px] w-[16px]" height={16} width={16} />
                        </div>
                        <p className="text-xs/relaxed font-bold">{item.name}</p>
                      </div>
                      <p className="text-xs/relaxed">{item.dial_code}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}