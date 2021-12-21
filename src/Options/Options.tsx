import { ClosedTabs } from "./ClosedTabs";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabPanel } from "./TabPanel";

export function Options() {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Closed Tabs" {...a11yProps(0)} />
        <Tab label="Settings" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0} header={"closed tabs"}>
        <ClosedTabs />
      </TabPanel>
      <TabPanel value={value} index={1} header={"settings"}></TabPanel>
    </Box>
  );
}

export function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
