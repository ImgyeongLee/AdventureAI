import WhiteWave from '../components/Wave/WhiteWave';
import { useNavigate } from 'react-router-dom';
import { SetStateAction, useState } from 'react';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';
import React from 'react';
import Loading from './Loading';

const Role = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const setGuest = useAction(api.action.setGuest);
  const getGameId = useAction(api.action.getGameId);
  const [name, setName] = useState<string>('');
  const [hp, setHP] = useState<number>(0);
  const [skill, setSkill] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [numChar, serNumChar] = useState<number>(0);

  const handleName = (event: { target: { value: SetStateAction<string> } }) => {
    setName(event.target.value);
  };

  const handleHP = (event: { target: { value: SetStateAction<number> } }) => {
    setHP(event.target.value);
  };

  const handleSkill = (event: { target: { value: SetStateAction<string> } }) => {
    setSkill(event.target.value);
    serNumChar(event.target.value.length);
  };

  const handleClick = () => {
    if (!(name && hp && skill)) return;

    setIsLoading(true);
    if (user && user.userId) {
      setGuest({ userId: user.userId, name: name, healthPoints: Number(hp), skill: skill }).then(() => {
        getGameId({ userId: user.userId }).then((gameId) => {
          setIsLoading(false);
          navigate(`/gameplay/${gameId}`);
        });
      });
    }
  };

  return (
    <React.Fragment>
      {isLoading && <Loading />}
      {!isLoading && (
        <section className="bg-gradient-to-b from-hackathon-dark-blue to-hackathon-dark-gradient h-full w-full flex justify-center font-body">
          <div className="bg-hackathon-yellow h-4/5 w-3/4 self-center z-50 shadow-lg rounded-xl grid grid-rows-hackathon-form text-hackathon-black font-body min-w-[653px]">
            <div className="text-center pt-8 select-none cursor-default">
              <div className={'flex items-center justify-between w-full'}>
                <img
                  className="ml-[20pt] w-[54px] cursor-pointer transition duration-200 ease-in-out transform hover:scale-110 hover-border-bottom"
                  src="https://img.icons8.com/sf-black-filled/64/left.png"
                  alt="arrow-pointing-left"
                  onClick={handleClick}
                />
                <div className="ml-[-20pt] text-6xl font-semibold italic pb-1 flex-1 text-center">Role Information</div>
                <div className="w-auto invisible"> {/* Invisible spacer with the same width as the back button */}</div>
              </div>
              <div className="italic">Turn in your role information!</div>
            </div>
            <div className="h-full w-full px-12 pb-12 grid grid-rows-hackathon-role-form grid-cols-half">
              <div className="pr-24">
                <div className="font-bold pb-2 text-3xl">Name</div>
                <input
                  onChange={handleName}
                  type="text"
                  placeholder="Type your name"
                  className="w-full rounded-md p-3"
                />
              </div>
              <div className="pl-24">
                <div className="font-bold pb-2 text-3xl">Health Points</div>
                <input
                  onChange={handleHP}
                  type="text"
                  placeholder="Type your Health Point"
                  className="w-full rounded-md p-3"
                />
              </div>
              <div className="col-span-2 pb-12">
                <div className="font-bold pb-2 text-3xl">Description</div>
                <textarea
                  onChange={handleSkill}
                  placeholder="Describe yourself to create your own skill (e.g. I am a little bad boy)"
                  className="w-full h-full rounded-lg p-3 resize-none"
                />
                <div className="text-end">{numChar} / 1000</div>
              </div>
            </div>
            <button
              onClick={handleClick}
              className="w-full bg-hackathon-black py-4 rounded-br-xl rounded-bl-xl text-white italic font-semibold text-3xl relative bottom-0 hover:text-hackathon-black hover:bg-white transition ease-in-out">
              Join the game!
            </button>
          </div>
          <WhiteWave />
        </section>
      )}
    </React.Fragment>
  );
};

export default Role;
