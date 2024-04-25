import ArtistOfTheDay from "../components/ArtistOfTheDay";
import useArtistOfTheDay from "../hooks/useArtistOfTheDay";

const DailyArtistPage = () => {
  const {
    artistOfTheDay,
    isLoading: isArtistOfDayLoading,
    error: dailyArtistError,
  } = useArtistOfTheDay();

  return (
    <ArtistOfTheDay
      artistOfTheDay={artistOfTheDay}
      isLoading={isArtistOfDayLoading}
      error={dailyArtistError}
    />
  );
};

export default DailyArtistPage;
