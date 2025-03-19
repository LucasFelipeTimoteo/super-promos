import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { styles } from './searchBox.style';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, placeholder = "Buscar...", inputRef }) => {
  const handleSearch = () => {
    if (inputRef.current) {
      onSearch(inputRef.current.value);
    }
  };

  return (
    <Box sx={styles.searchboxWrapper}>
      <TextField
        inputRef={inputRef}
        label={placeholder}
        variant="outlined"
        sx={styles.textField}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Buscar
      </Button>
    </Box>
  );
};

export default SearchBox;