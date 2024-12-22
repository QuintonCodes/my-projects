import { SearchRounded } from "@mui/icons-material";

interface SearchBarProps {
  isMediumScreenDown: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

const SearchBar = ({
  isMediumScreenDown,
  onChange,
  searchQuery,
}: SearchBarProps) => {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        justifyContent: isMediumScreenDown ? "flex-start" : "center",
        margin: "20px",
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "15px",
          display: "flex",
          maxWidth: "300px",
          padding: "8px 12px",
          width: "100%",
        }}
      >
        <SearchRounded sx={{ color: "#000" }} />
        <input
          type="search"
          placeholder="Search artist"
          value={searchQuery}
          onChange={onChange}
          style={{
            backgroundColor: "white",
            border: "none",
            color: "black",
            flexGrow: 1,
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            outline: "none",
            padding: "0 10px",
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
