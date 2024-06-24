import { Skeleton } from "@mui/material";

interface SkeletonUIProps {
  height?: number;
  variant: "circular" | "rectangular" | "rounded" | "text";
  width?: number;
  animation: false | "wave" | "pulse" | undefined;
}

const SkeletonUI = ({ animation, height, variant, width }: SkeletonUIProps) => {
  return (
    <Skeleton
      animation={animation}
      height={height}
      variant={variant}
      width={width}
    />
  );
};

export default SkeletonUI;
