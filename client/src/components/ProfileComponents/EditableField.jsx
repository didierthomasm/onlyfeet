import React from 'react';
import { StyledInput, StyledTextArea } from '../../assets/style/Profile/ProfileStyle.js';

const EditableField = ({ isEditing, value, onChange, name, placeholder, DisplayComponent, isTextArea = false }) => {
  if (isEditing) {
    return isTextArea ? (
      <StyledTextArea
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
      />
    ) : (
      <StyledInput
        type="text"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
      />
    );
  } else {
    return <DisplayComponent>{value}</DisplayComponent>;
  }
};

export default EditableField;
