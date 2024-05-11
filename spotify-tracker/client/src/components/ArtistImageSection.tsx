import { Box } from "@mui/material";
import { Artist } from "../utils/models";

interface ArtistImageSectionProps {
  artist: Artist | null;
}

const ArtistImageSection = ({ artist }: ArtistImageSectionProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <img
        src={artist?.image}
        alt={artist?.name}
        style={{
          height: "auto",
          width: "100%",
          flexShrink: 0,
          marginRight: "20px",
        }}
      />
    </Box>
  );
};

export default ArtistImageSection;
