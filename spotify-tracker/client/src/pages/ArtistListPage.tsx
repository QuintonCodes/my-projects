import { FC, useState } from "react";
import ArtistList from "../components/ArtistList";
import useArtists from "../hooks/useArtists";

const ArtistListPage: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const {
    artists,
    isLoading: isArtistsLoading,
    error: artistError,
    totalPages,
  } = useArtists(currentPage, itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <ArtistList
      totalPages={totalPages}
      artists={artists}
      error={artistError}
      isLoading={isArtistsLoading}
      currentPage={currentPage}
      handlePageChange={handlePageChange}
    />
  );
};

export default ArtistListPage;
