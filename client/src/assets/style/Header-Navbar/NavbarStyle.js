import styled from "styled-components";

const Nav = styled.nav`

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    margin: 0.5rem;
    justify-content: center;
    //padding-right: 3rem;

    a {
      text-decoration: none;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: .5rem;
      position: relative;
    }

    a:hover {
      color: #545454;

      span {
        max-width: 100px;
        opacity: 1;
      }
    }

    span {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      max-width: 0;
      opacity: 0;
      transition: all 0.8s ease;
      position: absolute;
      left: 100%;
      top: 1rem;
      bottom: 1rem;
    }

    .active-icon {
      display: none;
    }

    .active {
      .inactive-icon {
        display: none;
      }

      .active-icon {
        display: inline;
      }
    }
  }

  hr {
    margin: 8px -10px;
    border-top: 1px solid #000;
  }
`;



export default Nav;