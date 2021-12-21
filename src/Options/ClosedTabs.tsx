import { useEffect, useState } from "react";
import styled from "styled-components";

export function ClosedTabs() {
  const [tabs, setTabs] = useState<{ url: string; closedAt: number }[]>([]);

  useEffect(() => {
    async function fetchTabs() {
      const { closedTabs } = await chrome.storage.sync.get("closedTabs");
      setTabs(Object.values(closedTabs));
    }

    const interval = setInterval(() => {
      fetchTabs();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {tabs.map(({ url }, index) => (
        <ListItem key={index}>{url}</ListItem>
      ))}
    </>
  );
}

const ListItem = styled.p`
  font-size: 10px;
`;
