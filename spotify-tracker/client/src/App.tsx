import { FC, useState } from "react";
import ArtistList from "./components/ArtistList";
import ArtistOfTheDay from "./components/ArtistOfTheDay";
import useArtists from "./hooks/useArtists";
import useArtistOfTheDay from "./hooks/useArtistOfTheDay";
import { Container } from "@mui/material";

const App: FC = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    artists,
    isLoading: isArtistsLoading,
    error: artistError,
    totalPages,
  } = useArtists(currentPage, itemsPerPage);
  const { artistOfTheDay, isLoading: isArtistOfDayLoading } =
    useArtistOfTheDay();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <ArtistList
        totalPages={totalPages}
        artists={artists}
        error={artistError}
        isLoading={isArtistsLoading}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      <ArtistOfTheDay
        artistOfTheDay={artistOfTheDay}
        isLoading={isArtistOfDayLoading}
      />
    </Container>
  );
};

export default App;
