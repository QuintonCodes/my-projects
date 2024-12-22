import { Button } from "@mui/material";

const Buttons = ({ onClick, text }: { onClick: () => void; text: string }) => {
  return (
    <Button
      onClick={onClick}
      size="small"
      sx={{
        borderRadius: 3,
        color: "#fff",
        fontSize: 16,
        padding: 1.25,
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#1DB954",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default Buttons;
