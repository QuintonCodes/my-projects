import { Skeleton } from "@mui/material";

interface SkeletonUIProps {
  animation: false | "wave" | "pulse" | undefined;
  height?: number;
  variant: "circular" | "rectangular" | "rounded" | "text";
  width?: number;
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
