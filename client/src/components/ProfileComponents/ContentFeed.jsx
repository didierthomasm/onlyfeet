import React from 'react';
import styled from 'styled-components';

const FeedContainer = styled.div`
  margin-top: 2rem;
`;

const ContentItem = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const ContentFeed = ({ contents }) => {
    return (
        <FeedContainer>
            {contents.map((content, index) => (
                <ContentItem key={index}>{content}</ContentItem>
            ))}
        </FeedContainer>
    );
};
