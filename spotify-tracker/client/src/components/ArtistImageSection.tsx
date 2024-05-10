import { Box, Typography } from "@mui/material";
import { Artist } from "../utils/models";

interface ArtistImageSectionProps {
  artist: Artist | null;
}

const ArtistImageSection = ({ artist }: ArtistImageSectionProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 400,
        backgroundImage: `url(${artist?.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        paddingLeft: 2,
        paddingBottom: 2,
      }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h2" color="white">
          {artist?.name}
        </Typography>
        <Typography variant="body2" color="white">
          Followers: {artist?.followers}
        </Typography>
      </Box>
    </Box>
  );
};

export default ArtistImageSection;
