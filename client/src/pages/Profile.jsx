import styled from "styled-components";

import image from "../assets/img/Errors/inProduction.png";

const Main = styled.main`

`;

export function Profile() {
  return (
    <Main>

      <img src={image} alt={''} style={{ height: '100vh'}}/>
    </Main>
  )
}