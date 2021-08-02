// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
import { RefObject, useEffect } from "react";

const useHandleOutsideClick = (
  // ref: RefObject<HTMLDivElement>,
  ref: RefObject<HTMLElement>,
  condition: boolean,
  cb: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        condition &&
        ref.current &&
        e.target instanceof Node &&
        !ref.current.contains(e.target)
      ) {
        // alert("xxx");
        cb();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, condition, cb]);
};

export default useHandleOutsideClick;
