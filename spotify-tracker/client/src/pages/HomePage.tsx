import logo from "../assets/Spotify-logo.png";

const HomePage = () => {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>
        Welcome to Vibe Voyage where you can discover new artists everyday
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <h5 style={{ paddingRight: 15 }}>Content provided by: </h5>
        <img src={logo} alt="logo" style={{ height: "70px" }} />
      </div>
    </div>
  );
};

export default HomePage;
