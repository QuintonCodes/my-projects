import { ArrowBackRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page") || "1";
    navigate(`/artists/${page}`);
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", marginRight: 15 }}>
      <IconButton onClick={handleBackClick}>
        <ArrowBackRounded sx={{ fontSize: 30, color: "#fff" }} />
      </IconButton>
    </div>
  );
};

export default BackButton;
