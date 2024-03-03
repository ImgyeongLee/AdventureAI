import { useNavigate, useParams } from 'react-router-dom';
import WhiteWave from '../components/Wave/WhiteWave';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const Result = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const gameInfo = useQuery(api.game.getGameInfo, { gameId: Number(gameId) });

  return (
    <section className="bg-gradient-to-b from-hackathon-dark-blue to-hackathon-dark-gradient h-full w-full flex justify-center font-body">
      <div className="flex flex-col text-center h-full self-center justify-center">
        <div className="select-none cursor-default text-white font-semibold text-8xl italic mb-4">
          {gameInfo && gameInfo.status == 'win' && 'Win!'}
          {gameInfo && gameInfo.status == 'lose' && 'Lose...'}
        </div>
        <button
          onClick={() => {
            navigate('/host-guest');
          }}
          className="bg-hackathon-pink p-3 text-white rounded-lg shadow-lg hover:bg-hackathon-gradient transition ease-in-out">
          Go back to home
        </button>
      </div>
      <WhiteWave />
    </section>
  );
};

export default Result;
