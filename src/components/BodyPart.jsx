
import { useBodyPart } from "../contexts/BodyPartContext"; // Import the custom hook

const BodyPart = ({ item }) => {
  const { bodyPart, setBodyPart } = useBodyPart(); // Access the context

  const bodyPartImages = {
    "upper arms" : "/icons/upper_arms.png",
    "upper legs" : "/icons/upper_legs.png",
    "lower arms" : "/icons/lower_arms.png",
    "lower legs" : "/icons/lower_legs.png",
    neck : "/icons/neck.png",
    waist : "/icons/waist.png",
    chest : "/icons/chest.png",
    back : "/icons/back.png",
    shoulders : "/icons/shoulder.png",
    cardio : "/icons/cardio.png",
  };
  
  return (
    <div
      className={`flex flex-col items-center justify-center 
        w-[150px] h-[150px] cursor-pointer gap-2 rounded-full
        poppinFont drop-shadow-md transition duration-300 ease-in-out hover:drop-shadow-xl hover:scale-110
        ${bodyPart === item ? "border-t-4 border-red-500" : ""} bg-white`}
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({ top: 800, left: 100, behavior: "smooth" });
      }}
    >
      <img
        src={bodyPartImages[item] || "./icons/fullbody.png"}
        alt={item}
        width="75px"
        height="75px"
        className="transition duration-300 ease-in-out hover:-translate-y-3 hover:scale-105 hover:drop-shadow-sm"
      />
      <p className="text-md font-bold text-gray-900 uppercase">{item}</p>
    </div>
  );
};

export default BodyPart;
