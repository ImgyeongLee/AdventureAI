import logo from "../assets/logo.svg"
import stardust from "../assets/stardust.svg"
import tree from "../assets/tree.svg"
import oval_background from "../assets/ovalbackground.svg"
import oval_background_purple from "../assets/ovalbackground-purple.svg"
import BlackWave from "../components/Wave/BlackWave";
import {DevCard} from "../components/DevCards/DevCard";

import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => navigate('/host-guest')

  return (
      <>
          <div className="bg-gradient-to-b from-hackathon-purple to-hackathon-gradient min-h-full w-full">
              <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-start">
                  <div className="flex justify-center relative">
                      <img className="stardust-l absolute w-[20%] -left-[-90%] top-[15vh] z-10" src={stardust} alt="Stardust-svg" style={{marginLeft: '-100%'}} />
                      <img className="logo w-[70%] h-auto z-20" src={logo} alt="Logo" />
                      <img className="stardust-r absolute w-[25%] top-[10px] -right-[-80%] z-10" src={stardust} alt="Stardust-svg" style={{marginRight: '-100%'}} />
                  </div>
              </div>
              <img className="absolute bottom-[-0.5%] left-1/2 transform -translate-x-1/2 z-[1] w-full max-h-full" src={oval_background} alt="oval-background-svg" />
              <img className="tree absolute bottom-[-5%] left-[77%] transform -translate-x-1/2 z-[1] w-[50%] h-auto" src={tree} alt="tree-svg" />
              <img className="tree absolute bottom-[-5%] left-[17%] transform -translate-x-1/2 z-[0] w-[40%] h-auto" src={tree} alt="tree-svg" />

              <div className="intro-description flex flex-col justify-center items-center min-h-screen">
                  <button
                      onClick={handleClick}
                      className="w-[20%] min-w-[100px] py-[25px] px-[20px] mt-[200px] bg-hackathon-pink hover:bg-blue-700 text-white font-bold rounded-[20px] z-[2]">
                      <p className="text-sm sm:text-lg md:text-xl lg:text-[2em]">Get Started</p>
                  </button>
                  <p className={"text-white font-light text-sm sm:text-lg md:text-xl lg:text-[2em] relative z-[2] mt-[20px]"}>Start your new adventure</p>
              </div>
          </div>
          <div className="bg-gradient-to-b from-hackathon-dark-blue to-hackathon-gradient min-h-screen relative z-[1] flex items-start">
              <div className="flex flex-col items-center text-center mt-[100px] text-white">
                  <div className="catch text-left w-[70%] max-w-[500px] mx-auto">
                      <p className="font-bold text-[5rem] mb-[-20px]">Customize</p>
                      <p className="font-bold text-[5rem] mb-[-20px]">Your</p>
                      <p className="font-bold text-[5rem] mb-[-20px]">Game</p>
                      <p className="text-white text-[1.5rem] text-left">AI will become the Game Master for your imaginative game!</p>
                  </div>
              </div>
              <div className="svgDiv mx-auto mt-[100px]">
                  <img className="w-[80%] mx-auto" src={logo} alt="some-svg" />
              </div>
          </div>
          <div className={"bg-gradient-to-b from-hackathon-blue to-hackathon-gradient min-h-full w-full"} >
              <img className="absolute bottom-[-100.5%] left-1/2 transform -translate-x-1/2 z-[1] w-full max-h-full" src={oval_background_purple} alt="oval-background-svg" />
              <div className={"flex flex-col items-center"}>
                  <div className={"text-[5rem] font-bold text-white text-center"}>Developers</div>
                  <div className={"flex flex-row justify-between items-center px-4 w-[80%] mt-[100px]"}>
                      <div className="flex-1">
                          <DevCard />
                          <div className={"text-[1.5rem] text-center text-white mt-[30px]"}>Derek Williams</div>
                          <div className={"text-[1.1rem] text-center text-white"}>Position</div>
                      </div>
                      <div className="flex-1">
                          <DevCard />
                          <div className={"text-[1.5rem] text-center text-white mt-[30px]"}>Hla Htun</div>
                          <div className={"text-[1.1rem] text-center text-white"}>Position</div>
                      </div>
                      <div className="flex-1">
                          <DevCard />
                          <div className={"text-[1.5rem] text-center text-white mt-[30px]"}>Imgyeong Lee</div>
                          <div className={"text-[1.1rem] text-center text-white"}>Position</div>
                      </div>
                  </div>
                  <div className={"deco"}>
                      <img className="relative w-[65%] top-[-40vh] left-[-40vw] z-10" src={stardust} alt="Stardust-svg" style={{marginRight: '-100%'}} />
                      <img className="relative w-[65%] top-[-45vh] right-[-47vw] z-10" src={stardust} alt="Stardust-svg" style={{marginLeft: '-100%'}} />
                  </div>
              </div>
          </div>
          <div className="absolute bottom-[-200%] z-[20] w-full">
              <BlackWave />
          </div>
      </>
  );
};

export default Home;
