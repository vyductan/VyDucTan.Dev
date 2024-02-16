import { Excalidraw as OriExcalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawProps as OriExcalidrawProps } from "@excalidraw/excalidraw/types/types";

import { FormItemChildProps } from "../Form";

export type ExcalidrawProps = OriExcalidrawProps &
  FormItemChildProps & {
    value?: string;
    className?: string;
  };
export const Excalidraw = ({ value, className, ...rest }: ExcalidrawProps) => {
  return (
    <div className={className}>
      <OriExcalidraw {...rest} />
    </div>
  );
};
