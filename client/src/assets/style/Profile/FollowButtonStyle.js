import styled from "styled-components";
import { PersonAdd, PersonRemove } from "@styled-icons/material";

// Styled button that changes based on the following status
export const FollowButtonStyled = styled.button`
  border: none;
  background-color: #f0f0f0;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e4e4e4;
  }

  // Change the color to indicate following status
  background-color: ${(props) => (props.$isFollowing ? "#a0e0a0" : "#f0f0f0")};
`;

// Icons for the follow/unfollow actions
export const AddIcon = styled(PersonAdd)`
  width: 24px;
  height: 24px;
`;

export const RemoveIcon = styled(PersonRemove)`
  width: 24px;
  height: 24px;
`;