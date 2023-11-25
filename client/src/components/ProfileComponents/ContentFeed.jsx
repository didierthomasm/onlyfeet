import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useQuery} from '@apollo/client';
import {QUERY_ME} from '../../utils/queries';

const FeedContainer = styled.div`
  margin-top: 2rem;
`;

const ContentItem = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Price = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

export const ContentFeed = ({contents}) => {
  const {loading, data} = useQuery(QUERY_ME);
  const [showContent, setShowContent] = useState([]);

  useEffect(() => {
    let updatedContent = [];
    if (data && data.me && data.me.content) {
      updatedContent = [...data.me.content];
    }
    if (contents) {
      updatedContent = [...updatedContent, ...contents];
    }
    setShowContent(updatedContent);
  }, [data, contents]);

  if (loading) return <div>Loading...</div>;

  return (
    <FeedContainer>
      {showContent.map((content) => (
        <ContentItem key={content._id}>
          <Title>{content.title}</Title>
          <Description>{content.description}</Description>
          <Price>${content.price}</Price>
        </ContentItem>
      ))}
    </FeedContainer>
  );
};
