import { Button } from "@mui/material";

interface ButtonsProps {
  onClick: () => void;
  text: string;
}

const Buttons = ({ onClick, text }: ButtonsProps) => {
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
