import { Spinner } from "../Spinner";

export const Loading = () => {
  return (
    <div className="absolute left-0 flex h-full w-full items-center justify-center">
      <div className="absolute left-0 h-full w-full select-none bg-white opacity-50 transition-opacity" />
      <Spinner />
    </div>
  );
};
