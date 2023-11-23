import styled from "styled-components";
import {Edit} from "@styled-icons/material/Edit";


export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85vw;
  height: 100%;
`;

export const CoverPhoto = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const ProfilePhoto = styled.img`
  height: 9.5rem;
  border-radius: 50%;
  border: 4px solid white;
  position: absolute;
  top: 12.5rem;
  transform: translateY(-50%);
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 75px;
`;

export const Name = styled.h1`
  margin: .5rem 0;
`;

export const Username = styled.h2`
  color: #555;
  margin-bottom: 1rem;
`;

export const BioSection = styled.section`
  padding: 1.5rem;
  margin-top: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
  text-align: center;
`;

export const BioText = styled.p`
  color: #333;
  font-size: 1rem;
  margin-top: 0;
`;


export const EditButton = styled.button`
  border: none;
  background-color: #f0f0f0;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 1rem;

  &:hover {
    background-color: #e4e4e4;
  }
`;

export const Icon = styled(Edit)`
  width: 24px;
  height: 24px;
`;

export const StyledInput = styled.input`
  font-size: 1rem;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 1rem;
`;

export const StyledTextArea = styled.textarea`
  font-size: 1rem;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: auto;
  width: 18.75rem;
  height: 5rem;
  max-width: 600px;
`;

export const ImageInput = styled.input`
  display: block;
  margin: 10px 0;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

export const ImagePreview = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 18px;
    color: #333;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

// Container for name and edit button
export const NameEditContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

// Container for tabs
export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
`;

// Individual tab button
export const TabButton = styled.button`
  flex-grow: 1;
  padding: 10px;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 3px solid transparent;
  background-color: ${({ $active }) => ($active ? '#e4e4e4' : 'none')};
  border-bottom: ${({ $active }) => ($active ? '3px solid #007bff' : '3px solid transparent')};

  &:hover {
    background-color: #f0f0f0;
  }
`;
