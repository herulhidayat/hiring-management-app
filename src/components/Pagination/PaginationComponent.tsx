import { Pagination } from "@mui/material";
import SelectStatic from "../Form/SelectStatic";
import { OPTIONS_SELECT_PAGINATION_9 } from "../Config/options.config";
import { useTranslation } from "react-i18next";

interface IPaginationProps {
    itemsPerPage: number;
    totalData: number;
    oprionsSelect?: {key: string, value: string}[]
    callbackSelectedPageNumber: (v: any) => void
    callbackPagination: (v: any) => void
    color?: string;
}
export default function PaginationComponent({ itemsPerPage, totalData, oprionsSelect = OPTIONS_SELECT_PAGINATION_9, callbackSelectedPageNumber, callbackPagination, color = "var(--color-white)" }: IPaginationProps) {
  const { t } = useTranslation();
  return (
    <div className="flex md:justify-between items-center md:flex-row flex-col gap-3">
      <div className="flex gap-3 items-center" style={{ color: color }}>
        {t("Per Page")}:
        <SelectStatic
          placeholder="Select Number of Cards"
          deafultValue={itemsPerPage.toString()}
          configData={oprionsSelect}
          callbackSelected={callbackSelectedPageNumber}
          style={{
            "& .MuiSelect-select": {
              paddingTop: "0px",
              paddingRight: "32px !important",
              paddingBottom: "0px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              border: "none",
              color: color,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${color}`,
            },
            "& .MuiSvgIcon-root": {
              color: color,
            },
          }}
        />
      </div>
      <Pagination
        count={Math.floor(totalData / itemsPerPage)}
        variant="outlined"
        shape="rounded"
        onChange={(e, page) => callbackPagination(page)}
        sx={{
          [`& .MuiPaginationItem-root`]: {
            color: color,
            borderColor: color,
          },
          [`& .MuiPaginationItem-root.Mui-selected`]: {
            color: color === "var(--color-white)" ? 'var(--color-primary) !important' : '#ffffff !important',
            backgroundColor: color,
          },
          [`& .MuiPaginationItem-root.Mui-selected:hover`]: {
            color: color === "var(--color-white)" ? 'var(--color-primary) !important' : '#ffffff !important',
            backgroundColor: color,
          },

        }}
      />
    </div>
  );
}
