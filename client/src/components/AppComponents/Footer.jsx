import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #F8F8F8;
  color: #333;
  font-size: 14px;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;

  a {
    color: #333;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #CCC;
  padding-top: 20px;
  text-align: center;
`;

export function Footer() {
  return (
    <FooterContainer>
      <FooterLinks>
        <a href="/client/src/components/HelpComponents/Contact">Contact</a>
        <a href="/client/src/pages/Help">Help</a>
        <a href="/about">About</a>
        <a href="/store">Store</a>
        <a href="/terms-of-service">Terms of Service</a>
        <a href="/privacy">Privacy</a>
        <a href="/dmca">DMCA</a>
      </FooterLinks>
      <FooterBottom>
        ©2023 OnlyFeet
      </FooterBottom>
    </FooterContainer>
  );
}