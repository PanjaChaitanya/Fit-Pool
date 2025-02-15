import BodyPart from './BodyPart';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { useBodyPart } from '../contexts/BodyPartContext';
import { useRef } from 'react';


const HorizontalScrollbar = ({data}) => {


  const { bodyPart, setBodyPart } = useBodyPart();

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full flex items-center">
      {/* Left Scroll Button */}
      <button
        className="absolute left-0 z-1 p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition"
        onClick={scrollLeft}
      >
                <img src="./icons/left-arrow.png" alt="" />
      </button>


      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar whitespace-nowrap w-full "
      >
        {data.map((item) => (
          <div
            key={item.id || item}
            className="inline-block min-w-[150px] mx-5"
          >
            <BodyPart item={item} bodyPart={bodyPart} setBodyPart={setBodyPart} />
          </div>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button
        className="absolute right-0 z-10 p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition"
        onClick={scrollRight}
      >
        <img src="./icons/right-arrow.png" alt="" />
      </button>
    </div>
  );
};

export default HorizontalScrollbar;
