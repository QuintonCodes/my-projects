import { Box, TextField, InputAdornment } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";

interface SearchBarProps {
  isMediumScreenDown: boolean;
  searchQuery: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({
  isMediumScreenDown,
  searchQuery,
  onChange,
}: SearchBarProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        justifyContent: isMediumScreenDown ? "flex-start" : "center",
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search artist"
        sx={{
          bgcolor: "white",
          borderRadius: 3,
          input: { color: "black" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: 3,
            },
            "&:hover fieldset": {
              borderColor: "#1DB954", // Hover color
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1DB954", // Active color
            },
          },
          mr: 2,
          width: { xs: "100%", sm: "auto" },
          ml: isMediumScreenDown ? 0 : 2,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          ),
        }}
        size="small"
        type="search"
        value={searchQuery}
        onChange={onChange}
      />
    </Box>
  );
};

export default SearchBar;
