import { FC, useState } from "react";
import AlertCard from "../components/AlertCard";
import GenericList from "../components/GenericList";
import Loading from "../components/Loading";
import PaginationComponent from "../components/PaginationComponent";
import SortFilter from "../components/SortFilter";
import useArtists from "../hooks/useArtists";
import { useUser } from "../hooks/useContext";
import useSortArtists from "../hooks/useSortArtists";

const ArtistListPage: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>("az");

  const {
    artists,
    isLoading: isArtistsLoading,
    error: artistError,
    totalPages,
  } = useArtists(currentPage);
  const { user } = useUser();
  const sortedArtists = useSortArtists(artists, sortOrder);

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <h1>Followed Artists</h1>
      <SortFilter sortOrder={sortOrder} setSortOrder={setSortOrder} />
      {isArtistsLoading ? (
        <Loading />
      ) : artistError || !user ? (
        <AlertCard severity="error" title="Error" alertText={artistError} />
      ) : (
        <GenericList items={sortedArtists} itemType="artist" />
      )}
      <PaginationComponent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ArtistListPage;
