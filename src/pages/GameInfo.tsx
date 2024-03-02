import BlueWave from '../components/Wave/BlueWave';

const GameInfo = () => {
  return (
    <section className="bg-gradient-to-b from-hackathon-purple to-hackathon-gradient h-full w-full flex justify-center">
      <div className="bg-hackathon-dark-purple h-4/5 w-3/4 self-center z-50 shadow-lg rounded-xl grid grid-rows-hackathon-form text-white font-body">
        <div className="text-center py-8 select-none cursor-default">
          <div className="text-6xl font-semibold italic pb-1">Game Information</div>
          <div className="italic">
            Turn in your basic game information!
            <br />
            The AI will automatically set your game.
          </div>
        </div>
        <div className="h-full w-full p-12">
          <textarea
            className="rounded-lg text-black p-3 resize-none h-full w-full"
            placeholder="Enter your game information such as monster info, setting, etc... That's it!"></textarea>
        </div>
        <button className="w-full bg-white py-4 rounded-br-xl rounded-bl-xl text-black italic font-semibold text-3xl relative bottom-0 hover:bg-hackathon-black hover:text-white transition ease-in-out">
          Create the game
        </button>
      </div>
      <BlueWave />
    </section>
  );
};

export default GameInfo;
