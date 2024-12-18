import Meteors from "../ui/Meteors";

const Promotional = () => {
  return (
    <div className="flex justify-center">
      <div className="relative flex h-[300px] w-[85%] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Meteors number={30} />
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 lg:text-8xl">
          Exclusive Offer
        </span>
        <span className="text-center">
        Sign up now to receive 10% off your first purchase!
        </span>
      </div>
    </div>
  );
};

export default Promotional;
