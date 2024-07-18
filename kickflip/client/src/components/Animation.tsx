import { FC } from "react";
import { useLottie } from "lottie-react";

interface AnimationProps {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
}

const Animation: FC<AnimationProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  style,
}) => {
  const options = {
    animationData: animationData,
    loop: loop,
    autoplay: autoplay,
  };

  const { View } = useLottie(options, style);

  return View;
};

export default Animation;
