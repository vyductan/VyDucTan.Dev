import { clsm } from "@vyductan/react/utils";

import { ComponentSize } from "../types";

export type SpinProps = {
  spinning?: boolean;
  size?: ComponentSize;
  children?: React.ReactNode;
};
const Spin = ({ spinning, size = "md", children }: SpinProps) => {
  return (
    <div>
      {spinning && (
        <div key="loading">
          <div
            aria-label="Loading"
            className="relative inline-flex flex-col items-center justify-center gap-2"
          >
            <div className={clsm("relative flex", size === "md" && "h-8 w-8")}>
              <i className="absolute h-full w-full animate-spinner-ease-spin rounded-full border-[3px] border-solid border-x-transparent border-b-primary border-t-transparent"></i>
              <i className="absolute h-full w-full animate-spinner-linear-spin rounded-full border-[3px] border-dotted border-x-transparent border-b-primary border-t-transparent opacity-75"></i>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Spin;
