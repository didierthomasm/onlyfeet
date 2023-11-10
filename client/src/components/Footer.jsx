import styled from "styled-components";

const MainFooter = styled.footer`
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
`;

export function Footer() {
  return (
    <MainFooter>
      <p>© 2023 Only Feet</p>
    </MainFooter>
  )
}