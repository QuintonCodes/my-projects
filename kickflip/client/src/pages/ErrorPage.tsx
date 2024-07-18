import { Link } from "react-router-dom";
import errorAnimation from "../assets/error-animation.json";
import { Button } from "../components/ui/button";
import Animation from "../components/Animation";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <Animation
        animationData={errorAnimation}
        style={{ height: 300, width: 300 }}
      />
      <h1>Oops! Page not found.</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">
        <Button className="my-3">Go back to Home</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
