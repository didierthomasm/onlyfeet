import {useQuery} from '@apollo/client';
import {QUERY_ME} from '../../utils/queries.js';
import styled from "styled-components";

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
  max-width: 500px;
  border-radius: 5px;
  
`;

const FollowersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
`;

const Username = styled.h2`
  color: #555;
  margin-bottom: 10px;
`;

const FollowersInfo = styled.p`
  color: #888;
`;

export function UserInfo() {
  const {loading, data} = useQuery(QUERY_ME);
  const user = data?.me;

  if (loading) return <p>Loading...</p>;

  return (
    <UserInfoContainer>
      <Username>{user.username}</Username>
      <FollowersContainer>
        <FollowersInfo>Following: {user.following.length}</FollowersInfo>
        <FollowersInfo>Followers: {user.followers.length}</FollowersInfo>
      </FollowersContainer>
    </UserInfoContainer>
  );
}
