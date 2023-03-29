/**
 *
 * SearchBox
 *
 */
import * as React from 'react';
import { CgSearch } from 'react-icons/cg';
import styled from 'styled-components/macro';

interface Props {
  list: object[];
  searchKey: string;
}

export function SearchBox(props: Props) {
  const [query, setQuery] = React.useState('');

  const handleChange = e => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  React.useEffect(() => {
    if (query.length > 0) {
      props.list.filter((obj: object) => {
        return obj[props.searchKey].match(query);
      });
    }
  }, []);

  return (
    <SearchBoxWrapper>
      <CgSearch fontSize={14} color={'#F00'} />
      <SearchBoxInp
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={query}
      />
    </SearchBoxWrapper>
  );
}

const SearchBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #58585a88;
  padding: 2px;
  border-radius: 2px;
  width: 100%;
`;

const SearchBoxInp = styled.input`
  outline: none;
  padding: 0 4px;
  font-size: 12px;
  width: 100%;
`;
