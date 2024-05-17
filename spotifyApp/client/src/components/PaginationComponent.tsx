import { Pagination } from "@mui/material";

interface PaginationComponentProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const PaginationComponent = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationComponentProps) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

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
