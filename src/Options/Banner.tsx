import styled from "styled-components";
import dino from "../media/dino.gif";

export function Banner() {
  return (
    <LogoContainer>
      <Dino src={dino} alt="logo" />
      <Header>Chrome Janitor</Header>
    </LogoContainer>
  );
}

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #e1dfe0;
  padding: 10px;
  width: 200px;
`;

const Header = styled.header`
  text-align: center;
  font-size: 15px;
  color: #454545;
`;

const Dino = styled.img`
  width: 150px;
  height: 150px;
`;
