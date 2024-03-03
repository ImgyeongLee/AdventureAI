export const DevCard = ( {imageLink} ) => {
  return (
      <div className="w-[80%] h-[250px] mx-auto border-0 rounded-[10px] overflow-hidden flex items-center justify-center bg-transparent">
        <img
            className="max-w-full max-h-full object-cover border-0 rounded-[10px]"
            src={imageLink}
            alt="Developer Image"
        />
      </div>
  );
};
