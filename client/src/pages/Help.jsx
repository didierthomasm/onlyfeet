// Help-Contact.jsx
import React from 'react';

// Import the styled components for the Help-Contact layout
import { HelpContainer, SectionTitle, Section } from '../assets/style/Help-Contact/HelpStyle.js';

// Import the Contact component
import Contact from '../components/Contact.jsx';

export function Help() {
  return (
    <HelpContainer>
      <SectionTitle>Help & Support</SectionTitle>
      <Section>
        <SectionTitle>Frequently Asked Questions (FAQs)</SectionTitle>
        {/* Content for FAQs, possibly a list or an accordion component */}
      </Section>
      <Section>
        <SectionTitle>Contact Us</SectionTitle>
        <Contact />
      </Section>
      {/* Additional sections for help and support can be added here */}
    </HelpContainer>
  );
}

export default Help;
