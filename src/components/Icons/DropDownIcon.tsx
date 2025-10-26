// components/CustomArrow.tsx
import { SvgIcon, SvgIconProps } from "@mui/material";
import { forwardRef } from "react";

const DropDownIcon = forwardRef<SVGSVGElement, SvgIconProps>(function CustomArrow(props, ref) {
  return (
    <SvgIcon
      ref={ref}
      {...props}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      className={`MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined ${props.className ?? ""}`}
    >
      <g clipPath="url(#clip0_5_856)">
        <path
          d="M5.6891 8.30092L2.12878 4.73687C1.95707 4.56498 1.95707 4.2863 2.12878 4.11443L2.54404 3.69874C2.71546 3.52714 2.99328 3.52681 3.1651 3.698L6.00001 6.52258L8.8349 3.698C9.00672 3.52681 9.28454 3.52714 9.45596 3.69874L9.87122 4.11443C10.0429 4.28632 10.0429 4.56499 9.87122 4.73687L6.31091 8.30092C6.1392 8.47279 5.86082 8.47279 5.6891 8.30092Z"
          fill="#B3B6B8"
        />
      </g>
      <defs>
        <clipPath id="clip0_5_856">
          <rect
            width="8"
            height="4.86"
            fill="white"
            transform="translate(2 3.56982)"
          />
        </clipPath>
      </defs>
    </SvgIcon>
  );
});

export default DropDownIcon;
