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
  const itemsPerPage = 10;

  const {
    data,
    isLoading: isArtistsLoading,
    error: artistError,
  } = useArtists(currentPage, itemsPerPage);

  const { user } = useUser();
  const sortedArtists = useSortArtists(data?.artists || [], sortOrder);

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
        <AlertCard
          severity="error"
          title="Error"
          alertText={
            artistError?.message || "Please log in to view this content."
          }
        />
      ) : (
        <GenericList items={sortedArtists} itemType="artist" />
      )}
      <PaginationComponent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={Math.ceil((data?.total || 0) / itemsPerPage)}
      />
    </div>
  );
};

export default ArtistListPage;
