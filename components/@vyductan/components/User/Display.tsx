import Avatar from "./Avatar";
import Name from "./Name";

const Display = () => {
  return (
    <div className="flex items-center space-x-2">
      <Avatar />
      <Name />
    </div>
  );
};

export default Display;
