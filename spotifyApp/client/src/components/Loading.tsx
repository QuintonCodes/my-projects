import { CircularProgress, SxProps, Theme } from "@mui/material";

const Loading = ({ sx }: { sx?: SxProps<Theme> | undefined }) => {
  return <CircularProgress color="inherit" sx={sx} />;
};

export default Loading;
