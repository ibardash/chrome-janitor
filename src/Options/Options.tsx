import * as React from "react";
import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ClosedTabs } from "./ClosedTabs";
import { TabPanel } from "./TabPanel";
import { Banner } from "./Banner";
import { Settings } from "./Settings";

export function Options() {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Banner style={{ marginBottom: 20 }} />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{
            borderRight: 1,
            borderColor: "divider",
            minWidth: 205,
          }}
        >
          <Tab
            label={<span className="tab-label">Closed Tabs</span>}
            {...a11yProps(0)}
          />
          <Tab
            label={<span className="tab-label">Settings</span>}
            {...a11yProps(1)}
          />
        </Tabs>
        <TabPanel value={value} index={0} header={"closed tabs"}>
          <ClosedTabs />
        </TabPanel>
        <TabPanel value={value} index={1} header={"settings"}>
          <Settings />
        </TabPanel>
      </Box>
    </Container>
  );
}

export function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Container = styled.div`
  padding: 20px;
`;
