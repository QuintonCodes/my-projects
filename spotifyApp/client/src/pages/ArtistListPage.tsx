import { useState, useEffect } from "react";
import AlertCard from "../components/AlertCard";
import GenericList from "../components/GenericList";
import Loading from "../components/Loading";
import PaginationComponent from "../components/PaginationComponent";
import SortFilter from "../components/SortFilter";
import { useArtists } from "../hooks/useArtists";
import { useUser } from "../hooks/useContext";
import useSortArtists from "../hooks/useSortArtists";
import { useNavigate, useParams } from "react-router-dom";

const ArtistListPage = () => {
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page || "1"));
  const [sortOrder, setSortOrder] = useState<string>("az");
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(parseInt(page || "1"));
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    navigate(`/artists/${value}`, { replace: true });
  };

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
        padding: "10px",
      }}
    >
      <h1>Followed Artists</h1>
      <SortFilter sortOrder={sortOrder} setSortOrder={setSortOrder} />
      {!user ? (
        <AlertCard
          severity="error"
          title="Error"
          alertText="Please log in to view this content."
        />
      ) : isArtistsLoading ? (
        <Loading />
      ) : artistError ? (
        <AlertCard
          severity="error"
          title="Error"
          alertText={artistError?.message}
        />
      ) : (
        <GenericList items={sortedArtists} itemType="artist" />
      )}
      <PaginationComponent
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={Math.ceil((data?.total || 0) / itemsPerPage)}
      />
    </div>
  );
};

export default ArtistListPage;
