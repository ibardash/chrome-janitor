import { useEffect, useState } from "react";
import styled from "styled-components";

export function ClosedTabs() {
  const [tabs, setTabs] = useState<
    { url: string; closedAt: number; title: string }[]
  >([]);

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
      {tabs.map(({ url, title, closedAt }, index) => (
        <ListItem key={index}>
          <Time>
            {new Intl.DateTimeFormat("default", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            }).format(new Date(closedAt))}
          </Time>
          <a href={url} target="_blank" rel="noreferrer">
            {title}
          </a>
        </ListItem>
      ))}
    </>
  );
}

const ListItem = styled.div`
  font-size: 10px;
  line-height: 20px;
  display: flex;
  flex-direction: row;
`;

const Time = styled.div`
  color: #666666;
  margin-right: 20px;
`;
