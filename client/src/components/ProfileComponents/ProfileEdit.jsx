import {useState} from 'react';

import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations.js';
import { QUERY_ME } from '../../utils/queries.js';

import EditableField from './EditableField.jsx';
import {Name, Username, BioSection, EditButton, Icon, BioText, ImagePreview, ImageInput} from '../../assets/style/Profile/ProfileStyle.js';

export function ProfileEdit({ profile, setIsEditing }) {
  const [editValues, setEditValues] = useState({
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    username: profile.username || '',
    bio: profile.bio || '',
    coverPic: profile.coverPic || '',
    profilePic: profile.profilePic || ''
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    update(cache, { data: { updateUser } }) {
      // Read the cache for the data you want to update
      const existingUser = cache.readQuery({ query: QUERY_ME });

      // Write the updated data to the cache
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: updateUser },
      });
    },
  });

  const handleImageChange = (event, imageType) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditValues(prevValues => ({
        ...prevValues,
        [imageType]: reader.result
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (name, value) => {
    setEditValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };


  const handleSave = async () => {
    try {
      await updateUser({
        variables: {
          userId: profile._id, // Assuming the profile object contains _id
          ...editValues
        }
      });
      setIsEditing(false);
      // Optionally, you can refetch user data or use Apollo Client's cache to update the UI
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  return (
    <>
      <ImagePreview>
        <label>Cover Photo:</label>
        <ImageInput
          type="file"
          onChange={(e) => handleImageChange(e, 'coverPic')}
        />
        {editValues.coverPic && <img src={editValues.coverPic} alt="Cover Preview" />}
      </ImagePreview>
      <ImagePreview>
        <label>Profile Photo:</label>
        <ImageInput
          type="file"
          onChange={(e) => handleImageChange(e, 'profilePic')}
        />
        {editValues.profilePic && <img src={editValues.profilePic} alt="Profile Preview" />}
      </ImagePreview>
      <EditableField
        isEditing
        value={editValues.firstName}
        onChange={handleChange}
        name="firstName"
        placeholder="First Name"
        DisplayComponent={Name}
      />
      <EditableField
        isEditing
        value={editValues.lastName}
        onChange={handleChange}
        name="firstName"
        placeholder="First Name"
        DisplayComponent={Name}
      />
      <EditableField
        isEditing
        value={editValues.username}
        onChange={handleChange}
        name="username"
        placeholder="Username"
        DisplayComponent={Username}
      />
      <BioSection>
        <EditableField
          isEditing
          value={editValues.bio}
          onChange={handleChange}
          name="bio"
          placeholder="Bio"
          DisplayComponent={BioText}
          isTextArea
        />
      </BioSection>
      <EditButton onClick={handleSave}>
        <Icon /> Save
      </EditButton>
    </>
  );
}
