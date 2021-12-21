import * as React from "react";
import Box from "@mui/material/Box";

export function TabPanel({
  children,
  value,
  index,
  header,
  ...other
}: {
  children?: React.ReactNode;
  index: number;
  value: number;
  header: string;
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, paddingTop: 0 }}>
          <p>{header}</p>
          <br />
          {children ?? null}
        </Box>
      )}
    </div>
  );
}
