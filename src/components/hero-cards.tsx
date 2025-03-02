import colleagues from "../assets/Colleagues.png";
import charts from "../assets/Charts.png";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* People */}
      <div className="absolute w-[300px] left-10 top-60 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <img src={colleagues} alt="people analyzing data" />
      </div>

      {/* Charts */}
      <div className="absolute right-[140px] top-[70px] w-[280px] flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <img src={charts} alt="charts" />
      </div>
    </div>
  );
};
