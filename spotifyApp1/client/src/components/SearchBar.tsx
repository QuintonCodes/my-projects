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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        justifyContent: isMediumScreenDown ? "flex-start" : "center",
        margin: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "15px",
          border: "1px solid #ccc",
          padding: "8px 12px",
          width: "100%",
          maxWidth: "300px",
        }}
      >
        <SearchRounded sx={{ color: "#000" }} />
        <input
          type="search"
          placeholder="Search artist"
          value={searchQuery}
          onChange={onChange}
          style={{
            border: "none",
            outline: "none",
            flexGrow: 1,
            padding: "0 10px",
            fontSize: "16px",
            color: "black",
            backgroundColor: "white",
            fontFamily: "Poppins, sans-serif",
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
