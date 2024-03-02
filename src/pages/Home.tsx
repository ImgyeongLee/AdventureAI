// import "../styles/home.css"
import logo from "../assets/logo.svg"
import stardust from "../assets/stardust.svg"
import tree from "../assets/tree.svg"
import oval_background from "../assets/ovalbackground.svg"
import {useNavigate} from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => navigate('/host-guest')
  return (
      <>
          <div className="first-portion bg-gradient-to-b from-hackathon-purple to-hackathon-gradient min-h-full w-full">
              <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-start">
                  <img className="stardust-l relative w-[4vw] top-[80%] left-[-5vw] z-10" src={stardust} alt="Stardust-svg" />
                  <img className="logo relative w-[15vw] h-auto self-center" src={logo} alt="Logo" />
                  <img className="stardust-r relative w-[6vw] left-[5vw] top-[20%] z-10" src={stardust} alt="Stardust-svg" />
              </div>
              <img className="oval-background absolute bottom-[-21.5%] left-1/2 transform -translate-x-1/2 z-[0] min-w-full max-h-full" src={oval_background} alt="oval-background-svg" />
              <img className="tree absolute bottom-[-5%] left-[77%] transform -translate-x-1/2 z-[-1] w-[50%] h-auto" src={tree} alt="tree-svg" />
              <img className="tree absolute bottom-[-5%] left-[17%] transform -translate-x-1/2 z-[0] w-[40%] h-auto" src={tree} alt="tree-svg" />

              <div className="intro-description flex justify-center items-center min-h-screen">
                  <button
                      onClick={handleClick}
                      className="bg-hackathon-pink hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[20px] z-[2] w-[20vw] py-[20px] px-[20px]">
                      <p className="text-[2rem]">Get Started</p>
                  </button>
              </div>
          </div>
          <div className="bg-hackathon-dark-purple min-h-screen">
              <p className="text-white text-center pt-20 z-[2]">Customize Your Game</p>
          </div>
      </>
  );
};

export default Home;
