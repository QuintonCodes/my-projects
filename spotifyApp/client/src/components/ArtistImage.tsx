import { Artist } from "../utils/models";

const ArtistImage = ({ artist }: { artist: Artist | null | undefined }) => {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <img
        src={artist?.image}
        alt={artist?.name}
        style={{
          flexShrink: 0,
          height: "auto",
          marginRight: "20px",
          width: "100%",
        }}
      />
    </div>
  );
};

export default ArtistImage;
