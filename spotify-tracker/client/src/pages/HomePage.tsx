import { useContext } from "react";
import logo from "../assets/Spotify-logo.png";
import { UserContext } from "../context/UserContext";

const HomePage = () => {
  const userContext = useContext(UserContext);
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {!userContext?.user ? (
        <h1>
          Welcome to Vibe Voyage where you can discover new artists everyday
        </h1>
      ) : (
        <h1>Welcome to Vibe Voyage {userContext.user.display_name}, Enjoy!</h1>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <h4 style={{ paddingRight: 15 }}>Content provided by: </h4>
        <img src={logo} alt="logo" style={{ height: "70px" }} />
      </div>
    </div>
  );
};

export default HomePage;
