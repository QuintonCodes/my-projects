import { Grid, Typography } from "@mui/material";

const colors = ["#FF5733", "#33C4FF", "#D333FF", "#33FF57", "#FFD633"];

const GenreCard = ({ genre, id }: { genre: string; id: number }) => {
  return (
    <Grid
      item
      key={id}
      xs={5}
      md={3.5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: colors[id % colors.length],
        borderRadius: 2,
        height: "12vh",
        padding: 1,
      }}
    >
      <Typography>{genre}</Typography>
    </Grid>
  );
};

export default GenreCard;
