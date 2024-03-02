import "../styles/home.css"
import logo from "../assets/logo.svg"
import stardust from "../assets/stardust.svg"

const Home = () => {
  return (
      <>
          <div className={"home-container"}>
            Home
          </div>
          <div className="logo-container">
              <img className={"stardust-l"} src={stardust} alt="Stardust" />
              <img className="logo" src={logo} alt="Logo" />
              <img className="stardust-r" src={stardust} alt="Stardust" />
          </div>
      </>
  );
};

export default Home;
