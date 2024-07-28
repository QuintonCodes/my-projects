import { useLottie } from "lottie-react";
import { FC } from "react";

interface AnimationProps {
  animationData: object;
  autoplay?: boolean;
  loop?: boolean;
  style?: React.CSSProperties;
}

const Animation: FC<AnimationProps> = ({
  animationData,
  autoplay = true,
  loop = true,
  style,
}) => {
  const options = {
    animationData: animationData,
    autoplay: autoplay,
    loop: loop,
  };

  const { View } = useLottie(options, style);

  return View;
};

export default Animation;
