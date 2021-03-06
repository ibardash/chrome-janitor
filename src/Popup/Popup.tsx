import styled from "styled-components";
import { Button } from "./components/Button";
import dino from "../media/dino.gif";

export function Popup() {
  const handleOptionsClick = () => {
    chrome.tabs.create({
      url: "options.html",
      active: true,
    });
  };

  return (
    <Modal>
      <Header>
        <Dino src={dino} alt="logo" />
        Chrome Janitor
      </Header>

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
