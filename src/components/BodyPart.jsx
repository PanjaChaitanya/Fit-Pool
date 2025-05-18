import { useBodyPart } from "../contexts/BodyPartContext";

const BodyPart = ({ item }) => {
  const { bodyPart, setBodyPart } = useBodyPart();
  const selected = bodyPart === item;

  return (
    <button
      type="button"
      className={`chip ${selected ? "active" : ""}`.trim()}
      onClick={() => setBodyPart(item)}
    >
      {item}
    </button>
  );
};

export default BodyPart;
