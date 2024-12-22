import { Autocomplete, TextField } from "@mui/material";

interface SortOption {
  label: string;
  value: string;
}

const sortOptions: SortOption[] = [
  { label: "A to Z", value: "az" },
  { label: "Z to A", value: "za" },
];

const SortFilter = ({
  sortOrder,
  setSortOrder,
}: {
  sortOrder: string;
  setSortOrder: (value: string) => void;
}) => {
  return (
    <Autocomplete
      getOptionLabel={(option) => option.label}
      id="sort-artists"
      onChange={(event, newValue) => {
        if (newValue) {
          setSortOrder(newValue.value);
          console.log(event);
        }
      }}
      options={sortOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Sort by"
          sx={{
            ".MuiOutlinedInput-root": {
              bgcolor: "#333",
              color: "#fff",
              "& fieldset": { borderColor: "#777" },
              "&:hover fieldset": { borderColor: "#bbb" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
          }}
        />
      )}
      sx={{
        marginBottom: 2,
        width: 300,
        ".MuiAutocomplete-inputRoot": { color: "white" },
        ".MuiInputLabel-root": { color: "white" },
      }}
      value={sortOptions.find((option) => option.value === sortOrder)}
    />
  );
};

export default SortFilter;
