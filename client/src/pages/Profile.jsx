import React, { useContext, useState } from "react";
import userPlaceholder from "../assets/img/Profile+/profile-placeholder.png";
import coverPlaceholder from "../assets/img/Profile+/cover-placeholder.png";
import { GlobalContext } from "../context/GlobalState.jsx";
import {
  BioSection,
  BioText,
  CoverPhoto,
  EditButton,
  Icon,
  Name,
  ProfileContainer,
  ProfileInfo,
  ProfilePhoto,
  Username
} from '../assets/style/Profile/ProfileStyle.js';
import EditableField from "../components/EditableField.jsx";

export function Profile() {
  const { user, updateProfile } = useContext(GlobalContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    bio: user.bio,
  });

  const profilePictures = {
    userPic: user.profilePic || userPlaceholder,
    coverPic: user.coverPic || coverPlaceholder,
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave();
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updateProfile(editValues);
    setIsEditing(false);
  }

  const handleChange = (name, value) => {
    setEditValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <ProfileContainer>
      <CoverPhoto src={profilePictures.coverPic} alt='Cover'/>
      <ProfilePhoto src={profilePictures.userPic} alt="Profile"/>
      <ProfileInfo>
        {isEditing ? (
          <>
            <EditableField
              isEditing={isEditing}
              value={editValues.firstName}
              onChange={handleChange}
              name="firstName"
              placeholder="First Name"
              DisplayComponent={Name}
            />
            <EditableField
              isEditing={isEditing}
              value={editValues.lastName}
              onChange={handleChange}
              name="lastName"
              placeholder="Last Name"
              DisplayComponent={Name}
            />
          </>
        ) : (
          <Name>{`${user.firstName} ${user.lastName}`}</Name>
        )}
        <EditableField
          isEditing={isEditing}
          value={editValues.username}
          onChange={handleChange}
          name="username"
          placeholder="Username"
          DisplayComponent={Username}
        />
        <BioSection>
          <EditableField
            isEditing={isEditing}
            value={editValues.bio}
            onChange={handleChange}
            name="bio"
            placeholder="Bio"
            DisplayComponent={BioText}
            isTextArea
          />
        </BioSection>
        <EditButton onClick={handleEditToggle}>
          {isEditing ? <><Icon /> Save</> : <><Icon /> Edit Profile</>}
        </EditButton>
      </ProfileInfo>
    </ProfileContainer>
  );
}
