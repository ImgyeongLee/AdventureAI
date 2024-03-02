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
          <div className="bg-gradient-to-b from-hackathon-purple to-hackathon-gradient min-h-screen w-full overflow-hidden">
              <div className="relative flex justify-center items-center min-h-screen">
                  {/* Centering the stardust and logo images */}
                  <img className="absolute top-[30%] left-[30%] w-[5%] z-10" src={stardust} alt="Stardust-svg" />
                  <img className="absolute top-[15%] left-1/2 transform -translate-x-1/2 w-[20%] z-20" src={logo} alt="Logo" />
                  <img className="absolute top-[10%] right-[30%] w-[7%] z-10" src={stardust} alt="Stardust-svg" />

                  {/* Adjusting the position of the background oval and trees */}
                  <img className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0 w-full" src={oval_background} alt="oval-background-svg" />
                  <img className="absolute bottom-[0] left-[77%] transform -translate-x-1/2 z-0 w-[40%]" src={tree} alt="tree-svg" />
                  <img className="absolute bottom-[0] left-[20%] transform -translate-x-1/2 z-0 w-[30%]" src={tree} alt="tree-svg" />

                  {/* Ensuring the button and introduction text are well-positioned and visible */}
                  <div className="z-10 flex flex-col items-center">
                      <button
                          onClick={handleClick}
                          className="mt-[200px] w-full min-w-[100px] py-4 px-5 bg-hackathon-pink hover:bg-hackathon-dark-blue text-white font-bold rounded-lg transform hover:scale-110 transition-transform duration-150 ease-in-out active:button-press">
                          <p className="text-sm sm:text-lg md:text-xl">Get Started</p>
                      </button>
                      <p className="text-white font-light mt-4 text-sm sm:text-lg md:text-xl">Start your new adventure</p>
                  </div>
              </div>
          </div>
          <div className="bg-gradient-to-b from-hackathon-dark-blue to-hackathon-gradient min-h-screen relative z-[1] flex items-start">
              <div className="flex flex-col items-center text-center mt-[100px] md:mt-[50px] lg:mt-[100px] text-white">
                  <div className="catch text-left w-full sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-[500px] mx-auto">
                      <p className="font-bold text-[3rem] sm:text-[4rem] md:text-[5rem] mb-[-20px]">Customize</p>
                      <p className="font-bold text-[3rem] sm:text-[4rem] md:text-[5rem] mb-[-20px]">Your</p>
                      <p className="font-bold text-[3rem] sm:text-[4rem] md:text-[5rem] mb-[-20px]">Game</p>
                      <p className="mt-[40px] text-white text-[1rem] sm:text-[1.25rem] md:text-[1.5rem] text-left">AI will become the Game Master for your imaginative game!</p>
                  </div>
              </div>
              <div className="svgDiv mx-auto mt-[50px] sm:mt-[75px] md:mt-[100px]">
                  <img className="w-[60%] sm:w-[70%] md:w-[80%] mx-auto" src={logo} alt="some-svg" />
              </div>
          </div>
          <div className="bg-gradient-to-b from-hackathon-blue to-hackathon-gradient min-h-full w-full">
              <img className="relative bottom-[21vh] left-1/2 transform -translate-x-1/2 z-[2] w-full max-h-full" src={oval_background_purple} alt="oval-background-svg" />
              <div className="flex flex-col items-center">
                  <div className="text-[3rem] sm:text-[4rem] md:text-[5rem] font-bold text-white text-center">Developers</div>
                  <div className="flex flex-col sm:flex-row justify-between items-center px-4 w-[95%] sm:w-[80%] mt-[50px] sm:mt-[100px]">
                      <div className="flex-1 mb-4 sm:mb-0">
                          <DevCard />
                          <div className="text-[1.2rem] sm:text-[1.5rem] text-center text-white mt-[30px]">Derek Williams</div>
                          <div className="text-[1rem] sm:text-[1.1rem] text-center text-white">Position</div>
                      </div>
                      <div className="flex-1 mb-4 sm:mb-0">
                          <DevCard />
                          <div className="text-[1.2rem] sm:text-[1.5rem] text-center text-white mt-[30px]">Sayar Hla Htun</div>
                          <div className="text-[1rem] sm:text-[1.1rem] text-center text-white">Position</div>
                      </div>
                      <div className="flex-1">
                          <DevCard />
                          <div className="text-[1.2rem] sm:text-[1.5rem] text-center text-white mt-[30px]">Imgyeong Lee</div>
                          <div className="text-[1rem] sm:text-[1.1rem] text-center text-white">Position</div>
                      </div>
                  </div>
                  <div className="deco">
                      <img className="relative w-[65%] sm:w-[65%] md:w-[65%] top-[-40vh] sm:top-[-40vh] md:top-[-40vh] left-[-40vw] sm:left-[-40vw] md:left-[-40vw] z-10" src={stardust} alt="Stardust-svg" style={{marginRight: '-100%'}} />
                      <img className="relative w-[65%] sm:w-[65%] md:w-[65%] top-[-45vh] sm:top-[-45vh] md:top-[-45vh] right-[-47vw] sm:right-[-47vw] md:right-[-47vw] z-10" src={stardust} alt="Stardust-svg" style={{marginLeft: '-100%'}} />
                  </div>
              </div>
          </div>
          <div className="relative bottom-[0] z-[20] w-full">
              <BlackWave />
          </div>
      </>
  );
};

export default Home;
