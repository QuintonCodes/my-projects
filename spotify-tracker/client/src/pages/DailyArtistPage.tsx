import ArtistOfTheDay from "../components/ArtistOfTheDay";
import useArtistOfTheDay from "../hooks/useArtistOfTheDay";

const DailyArtistPage = () => {
  const { artistOfTheDay, isLoading: isArtistOfDayLoading } =
    useArtistOfTheDay();

  return (
    <ArtistOfTheDay
      artistOfTheDay={artistOfTheDay}
      isLoading={isArtistOfDayLoading}
    />
  );
};

export default DailyArtistPage;
