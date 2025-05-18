import BodyPart from "./BodyPart";

const HorizontalScrollbar = ({ data }) => {
  return (
    <div className="chip-row">
      {data.map((item) => (
        <BodyPart key={item} item={item} />
      ))}
    </div>
  );
};

export default HorizontalScrollbar;
