import { PuffLoader } from 'react-spinners';
import WhiteWave from '../components/Wave/WhiteWave';

const Loading = () => {
  return (
    <section className="bg-gradient-to-b from-hackathon-dark-blue to-hackathon-dark-gradient h-full w-full flex justify-center font-body">
      <div className="flex flex-col text-center h-full self-center justify-center">
        <PuffLoader color="#ffffff" size={250} cssOverride={{ marginTop: '-5em' }} />
        <div className="select-none cursor-default text-white pt-8 text-lg italic">Loading...</div>
      </div>
      <WhiteWave />
    </section>
  );
};

export default Loading;
