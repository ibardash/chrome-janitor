import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const PERIOD_OF_INACTIVITY_STORAGE_KEY = "periodOfInactivity";

const DEFAULT_PERIOD_OF_INACTIVITY_MINUTES = 60;

export function Settings() {
  const [period, setPeriod] = useState(DEFAULT_PERIOD_OF_INACTIVITY_MINUTES);

  // Get and use the stored period of inactivity when mounted
  useEffect(() => {
    async function getStoredPeriod() {
      const storedPeriodObject = (
        await chrome.storage.sync.get(PERIOD_OF_INACTIVITY_STORAGE_KEY)
      )[PERIOD_OF_INACTIVITY_STORAGE_KEY];

      if (!storedPeriodObject) return;

      setPeriod(storedPeriodObject[PERIOD_OF_INACTIVITY_STORAGE_KEY]);
    }

    getStoredPeriod();
  }, []);

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const period = event.target.valueAsNumber;

    // Update local state and extension storage
    try {
      setPeriod(period);
      chrome.storage.sync.set({ [PERIOD_OF_INACTIVITY_STORAGE_KEY]: period });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <Box sx={{ paddingTop: 2 }}>
      <TextField
        id="periodOfInactivity"
        label="Period of Inactivity (minutes)"
        type="number"
        value={period}
        onChange={handlePeriodChange}
        size="small"
      />
    </Box>
  );
}
