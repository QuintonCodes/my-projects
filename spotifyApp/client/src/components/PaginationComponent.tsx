import { Pagination } from "@mui/material";

interface PaginationComponentProps {
  currentPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  totalPages: number;
}

const PaginationComponent = ({
  currentPage,
  handlePageChange,
  totalPages,
}: PaginationComponentProps) => {
  return (
    <Pagination
      count={totalPages || 10}
      onChange={handlePageChange}
      page={currentPage}
      size="large"
      sx={{
        paddingY: 5,
        "& .MuiPaginationItem-root": {
          color: "white",
        },
        "& .MuiPaginationItem-root:hover": {
          backgroundColor: "rgba(79, 227, 131, 0.7)",
          color: "#fff",
        },
        "& .MuiPaginationItem-root.Mui-selected": {
          backgroundColor: "#1DB954",
          color: "white",
        },
      }}
    />
  );
};

export default PaginationComponent;
