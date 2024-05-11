import { CircularProgress } from "@mui/material";
import { SxProps, Theme } from "@mui/material";

interface LoadingProps {
  sx?: SxProps<Theme> | undefined;
}

const Loading = ({ sx }: LoadingProps) => {
  return <CircularProgress color="inherit" sx={sx} />;
};

export default Loading;
