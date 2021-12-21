import styled from "styled-components";
import dino from "../media/dino-cropped.gif";
import { CSSProperties } from "react";

export function Banner({ style }: { style?: CSSProperties }) {
  return (
    <Container style={style}>
      <LogoContainer>
        <Dino src={dino} alt="logo" />
        <Header>Chrome Janitor</Header>
      </LogoContainer>
      <Description>
        <p>Thanks for trying Chrome Janitor</p>
        <Details>
          Cleaning up unused tabs to ensure your browser runs as smooth as
          possible. <br />
          You can customise the extension below.
        </Details>

        <Details>
          <a
            href="https://chrome-janitor.odoo.com/"
            target="_blank"
            rel="noreferrer"
          >
            About us
          </a>
        </Details>
      </Description>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border: #e1dfe0 solid 2px;
  padding: 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #e1dfe0;
  padding: 10px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const Header = styled.header`
  text-align: center;
  font-size: 15px;
  color: #454545;
  width: 116px;
`;

const Dino = styled.img`
  width: 100px;
  height: 100px;
`;

const Details = styled.p`
  color: #666666;
`;
