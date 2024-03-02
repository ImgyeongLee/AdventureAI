import { PuffLoader } from 'react-spinners';

const Loading = () => {
  return (
    <section className="bg-gradient-to-b from-hackathon-purple to-hackathon-gradient h-full w-full">
      <div></div>
      <PuffLoader />
    </section>
  );
};

export default Loading;
