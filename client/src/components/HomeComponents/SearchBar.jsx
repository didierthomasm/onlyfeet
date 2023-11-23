import styled from "styled-components";

const SearchInput = styled.input`
  padding: 10px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 15.8rem
`;

export function SearchBar({searchTerm, handleSearchChange}) {

  return (
    <SearchInput
      type="text"
      placeholder="Search users..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
}
