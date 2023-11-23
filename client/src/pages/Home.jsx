import {useState} from "react";
import {useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import {SEARCH_USERS} from "../utils/queries";
import styled from 'styled-components';

import {UserInfo} from "../components/HomeComponents/UserInfo.jsx";
import {SearchBar} from "../components/HomeComponents/SearchBar.jsx";


const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85vw;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 45px;  // Position right below the search bar
  width: 17rem;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  z-index: 1000;  // Ensure dropdown appears above other content
`;

const SearchResultItem = styled(Link)`
  display: block;
  padding: 10px;
  color: black;
  text-decoration: none;
  &:hover {
    background-color: #f6f6f6;
  }
`;


export function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data } = useQuery(SEARCH_USERS, {
    variables: { searchTerm },
    skip: !searchTerm
  });

  const users = data?.searchUsers || [];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <HomeContainer>
      <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <UserInfo />
      {searchTerm && users.length > 0 && (
        <DropdownContainer>
          {users.map(user => (
            <SearchResultItem to={`/profile/${user._id}`} key={user._id}>
              {user.username} - {user.fullName}
            </SearchResultItem>
          ))}
        </DropdownContainer>
      )}
    </HomeContainer>
  );
}