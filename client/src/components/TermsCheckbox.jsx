import React, { useState } from 'react';
import { CheckboxContainer, CheckboxLabel, StyledCheckbox, ShowMoreText} from '../assets/style/Login-Signup-Forms/CheckboxStyle.js'

const TermsCheckbox = ({termsAndConditions ,setTermsAndConditions}) => {
  // const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const fullText = `I confirm that I am 18 years of age or older and I agree to the Terms and Conditions.
                    By checking this box, I acknowledge that I have read, understand,
                    and accept all terms and conditions set forth by this website.
                    I understand that providing false information regarding my age may result in the termination
                    of my account and possible legal consequences.`;
  const shortText = `${fullText.substring(0, 100)}...`; // Show the first 100 characters followed by ellipsis

  return (
    <CheckboxContainer>
      <StyledCheckbox
        id='termsAndConditions'
        name='termsAndConditions'
        required
        checked={termsAndConditions}
        onChange={() => setTermsAndConditions(!termsAndConditions)}
      />
      <CheckboxLabel htmlFor='termsAndConditions'>
        {showFullText ? fullText : shortText}
        <ShowMoreText onClick={() => setShowFullText(!showFullText)}>
          {showFullText ? ' Show less' : ' Show more'}
        </ShowMoreText>
      </CheckboxLabel>
    </CheckboxContainer>
  );
};

export default TermsCheckbox;
