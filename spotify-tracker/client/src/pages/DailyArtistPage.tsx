import DailyArtist from "../components/DailyArtist";
import useDailyArtist from "../hooks/useDailyArtist";

const DailyArtistPage = () => {
  const {
    dailyArtist,
    error: artistError,
    isLoading: isArtistLoading,
  } = useDailyArtist();

  return (
    <DailyArtist
      dailyArtist={dailyArtist}
      error={artistError}
      isLoading={isArtistLoading}
    />
  );
};

export default DailyArtistPage;
