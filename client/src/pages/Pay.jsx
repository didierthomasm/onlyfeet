import styled from "styled-components";
import image from "../assets/img/Errors/inProduction.png";

const Main = styled.main`
  @media (max-width: 768px) {
    /* Add your styles for reduced screen size here */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: lightgray;
    padding: 20px;
  }
`;

export function Pay() {
  return (
    <Main>
      <img src={image} alt={''} style={{ height: '100vh'}}/>
    </Main>
  )
}