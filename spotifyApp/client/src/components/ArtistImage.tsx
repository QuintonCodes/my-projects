import { Box } from "@mui/material";
import { Artist } from "../utils/models";

interface ArtistImageProps {
  artist: Artist | null | undefined;
}

const ArtistImage = ({ artist }: ArtistImageProps) => {
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

export default ArtistImage;
