import BlueWave from '../components/Wave/BlueWave';
import back_button from '../assets/back-button-white.png';
import { useNavigate } from 'react-router-dom';
import { SetStateAction, useState } from 'react';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';

const GameInfo = () => {
  const navigate = useNavigate();
  const goToPage = () => navigate('/host-guest');
  const [description, setDescription] = useState('');
  const createGame = useAction(api.game.createGame);


  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setDescription(event.target.value);
  };

  const handleClick = () => {
    createGame({ description });
  };

  return (
    <section className="bg-gradient-to-b from-hackathon-purple to-hackathon-gradient h-full w-full flex justify-center">
      <div className="bg-hackathon-dark-purple h-4/5 w-3/4 self-center z-50 shadow-lg rounded-xl grid grid-rows-hackathon-form text-white font-body">
        <div className="text-center py-8 select-none cursor-default">
          <div className="flex items-center justify-between w-full">
            <img
              className="ml-[20pt] w-[54px] cursor-pointer transition duration-200 ease-in-out transform hover:scale-110 hover-border-bottom"
              src={back_button}
              alt="arrow-pointing-left"
              onClick={goToPage}
            />
            <div className="ml-[-4pt] text-6xl font-semibold italic pb-1 flex-1 text-center">Game Information</div>
            <div className="w-auto invisible"> {/* Invisible spacer with the same width as the back button */}</div>
          </div>
          <div className="italic">
            Turn in your basic game information!
            <br />
            The AI will automatically set your game.
          </div>
        </div>
        <div className="h-full w-full p-12">
          <textarea
            className="rounded-lg text-black p-3 resize-none h-full w-full"
            onChange={handleChange}
            placeholder="Enter your game information such as monster info, setting, etc... That's it!"></textarea>
        </div>
        <button
          onClick={handleClick}
          className="w-full bg-white py-4 rounded-br-xl rounded-bl-xl text-black italic font-semibold text-3xl relative bottom-0 hover:bg-hackathon-black hover:text-white transition ease-in-out">
          Create the game
        </button>
      </div>
      <BlueWave />
    </section>
  );
};

export default GameInfo;
