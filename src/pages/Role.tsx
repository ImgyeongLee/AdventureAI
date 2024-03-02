import WhiteWave from '../components/Wave/WhiteWave';

const Role = () => {
  return (
    <section className="bg-gradient-to-b from-hackathon-dark-blue to-hackathon-dark-gradient h-full w-full flex justify-center font-body">
      <div className="bg-hackathon-yellow h-4/5 w-3/4 self-center z-50 shadow-lg rounded-xl grid grid-rows-hackathon-form text-hackathon-black font-body min-w-[653px]">
        <div className="text-center pt-8 select-none cursor-default">
          <div className="text-6xl font-semibold italic pb-1">Role Information</div>
          <div className="italic">Turn in your role information!</div>
        </div>
        <div className="h-full w-full px-12 pb-12 grid grid-rows-hackathon-role-form grid-cols-half">
          <div className="pr-24">
            <div className="font-bold pb-2 text-3xl">Name</div>
            <input type="text" placeholder="Type your name" className="w-full rounded-md p-3" />
          </div>
          <div className="pl-24">
            <div className="font-bold pb-2 text-3xl">Health Points</div>
            <input type="text" placeholder="Type your Health Point" className="w-full rounded-md p-3" />
          </div>
          <div className="col-span-2 pb-12">
            <div className="font-bold pb-2 text-3xl">Skills</div>
            <textarea placeholder="Type your skill information" className="w-full h-full rounded-lg p-3 resize-none" />
            <div className="text-end">/ 2500</div>
          </div>
        </div>
        <button className="w-full bg-hackathon-black py-4 rounded-br-xl rounded-bl-xl text-white italic font-semibold text-3xl relative bottom-0 hover:text-hackathon-black hover:bg-white transition ease-in-out">
          Join the game!
        </button>
      </div>
      <WhiteWave />
    </section>
  );
};

export default Role;
