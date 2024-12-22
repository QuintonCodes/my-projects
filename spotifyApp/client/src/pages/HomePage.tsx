import logo from "../assets/Spotify-logo.png";
import { useUser } from "../context/UserContext";

const HomePage = () => {
  const { user } = useUser();
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {!user ? (
        <h1>
          Welcome to Vibe Voyage where you can discover new artists everyday
        </h1>
      ) : (
        <h1>Welcome to Vibe Voyage {user.display_name}, Enjoy!</h1>
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
