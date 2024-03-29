import BlueWave from '../components/Wave/BlueWave';
import back_button from '../assets/back-button-white.png';
import { useNavigate } from 'react-router-dom';
import { SetStateAction, useState } from 'react';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';
import React from 'react';
import Loading from './Loading';
import { useAuth } from '@clerk/clerk-react';

const GameInfo = () => {
  const navigate = useNavigate();
  const goToPage = () => navigate('/host-guest');
  const [description, setDescription] = useState('');
  const createGame = useAction(api.game.createGame);
  const userAction = useAction(api.action.setHost);
  const [load, setLoad] = useState<boolean>(false);
  const user = useAuth();

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setDescription(event.target.value);
  };

  const handleClick = async () => {
    if (description.length == 0) return;

    if (user && user.userId) {
      setLoad(true);
      createGame({ description }).then((id) => {
        userAction({ userId: user.userId, gameId: Number(id) }).then(() => {
          setLoad(false);
          console.log(`Game created with id: ${id}`);
          navigate(`/gameplay/${id}`); // TODO: Redirect to the host page for this page
        });
      });
    }
  };

  return (
    <React.Fragment>
      {load && <Loading />}{' '}
      {!load && (
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
                <div className="ml-[-20pt] text-6xl font-semibold italic pb-1 flex-1 text-center">Game Information</div>
                <div className="w-auto invisible"> {/* Invisible spacer with the same width as the back button */}</div>
              </div>
              <div className="italic">
                Provide your basic game information!
                <br />
                The AI will automatically create your game.
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
      )}
    </React.Fragment>
  );
};

export default GameInfo;
