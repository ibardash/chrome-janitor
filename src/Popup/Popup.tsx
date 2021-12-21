import styled from "styled-components";
import { Button } from "./components/Button";
import dino from "../media/dino.gif";
import { useEffect, useState } from "react";

const getMemory = async () => {
  const memory = await chrome.storage.sync.get("memory");
  const memoryInUseMb = memory.memorySaved;
  return memoryInUseMb;
};

export function Popup() {
  const [memory, setMemory] = useState("loading...");

  const handleOptionsClick = () => {
    chrome.tabs.create({
      url: "options.html",
      active: true,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getMemory().then((memory) => setMemory(memory));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Modal>
      <Header>
        <Dino src={dino} alt="logo" />
        Chrome Janitor
      </Header>
      <h1>Saved: {memory}MB</h1>
      <Button onClick={handleOptionsClick}>Options</Button>
    </Modal>
  );
}

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  font-size: calc(10px + 2vmin);
  color: #454545;
`;

const Dino = styled.img`
  width: 100px;
  height: 100px;
`;
