import BlueWave from '../components/Wave/BlueWave';
import RoleCard from '../components/RoleCard';
import { useState, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import host from '../assets/host.webp';
import player from '../assets/player.png';
import { cn } from '../lib/tailwind-utils';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';

const HostGuest = () => {
  const [code, setCode] = useState<string>('');
  const user = useAuth();
  const [inputError, setInputError] = useState<boolean>(false);
  const navigate = useNavigate();
  const userAction = useAction(api.action.setUserGameId);

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setInputError(false);
    setCode(event.target.value);
  };

  const selectHost = () => {
    navigate('/game-info');
  };

  const selectGuest = () => {
    if (code.length != 0 && user.userId) {
      setCode('');
      userAction({ userId: user.userId, gameId: Number(code) });
      navigate('/role');
    }
    setInputError(true);
  };

  return (
    <section className="bg-gradient-to-b from-hackathon-purple to-hackathon-gradient h-full w-full">
      <div className="h-full w-full grid grid-rows-hackathon-row-2">
        <div className="row-span-1 flex justify-center self-center">
          <div className="px-14 py-4 text-5xl font-body italic font-semibold text-white select-none cursor-default">
            You are a...
          </div>
        </div>
        <div className="row-span-1 flex flex-row justify-center self-center h-full w-full z-50">
          <div className="flex flex-row gap-12 h-4/5 items-center relative top-5 w-full justify-center">
            <RoleCard className="rounded-lg shadow-lg h-full grid grid-rows-3 w-1/4 hover:scale-105 transition ease-in-out min-w-[316px] max-h-[650px]">
              <div className="w-full bg-white rounded-tr-lg rounded-tl-lg">
                <img
                  src={host}
                  alt="host"
                  className="w-full h-full object-cover custom-object-position rounded-tr-lg rounded-tl-lg"
                />
              </div>
              <div className="self-center text-4xl italic font-semibold font-body cursor-default p-4 text-center">
                Host
              </div>
              <div className="px-10 pb-6 text-center text-lg font-body cursor-default select-none">
                <div>Can direct the overall game</div>
                <div>Can control the game flow</div>
                <div>Can create your own monster</div>
                <div>Cannot play the game</div>
              </div>
              <button
                onClick={selectHost}
                className="w-full bg-white py-4 rounded-br-lg rounded-bl-lg text-hackathon-black italic font-semibold text-2xl transition ease-in-out hover:text-white hover:bg-hackathon-black ">
                SELECT
              </button>
            </RoleCard>
            <RoleCard className="rounded-lg shadow-lg bg-hackathon-yellow text-hackathon-black h-full w-1/4 grid grid-rows-3 hover:scale-105 transition ease-in-out min-w-[316px] max-h-[650px]">
              <div className="w-full bg-white rounded-tr-lg rounded-tl-lg">
                <img
                  src={player}
                  alt="host"
                  className="w-full h-full object-cover custom-object-position rounded-tr-lg rounded-tl-lg"
                />
              </div>
              <div className="self-center text-4xl italic font-semibold font-body cursor-default p-4 text-center">
                Player
              </div>
              <div className="px-10 pb-6 text-center text-lg font-medium font-body cursor-default select-none">
                <div>Only can play the game</div>
                <div className="pb-2">Beat the monster & Become a hero!</div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Type your invitation code"
                  className="rounded-md py-2 px-3 w-full font-normal shadow-md"></input>
              </div>
              <button
                onClick={selectGuest}
                className="w-full bg-hackathon-black py-4 rounded-br-lg rounded-bl-lg text-white italic font-semibold text-2xl relative bottom-0 hover:text-hackathon-black hover:bg-white transition ease-in-out">
                SELECT
              </button>
            </RoleCard>
          </div>
        </div>
      </div>
      <BlueWave />
    </section>
  );
};

export default HostGuest;
