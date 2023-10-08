import {
  createContext,
  useContext,
  type CSSProperties,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type PopoverContextType = {
  setReferenceElement: Dispatch<SetStateAction<Element | null>>;
  setPopperElement: Dispatch<SetStateAction<HTMLElement | null>>;
  // setPopperElement: Ref<HTMLDivElement> | undefined
  stylesPopper: CSSProperties | undefined;
  attributesPopper: { [key: string]: string } | undefined;
};
const PopoverContext = createContext<PopoverContextType | null>(null);

export const usePopoverContext = () =>
  useContext(PopoverContext) as PopoverContextType;

type PopoverProviderProps = {
  children: ReactNode;
  value: PopoverContextType;
};
export const PopoverProvider = ({ children, value }: PopoverProviderProps) => {
  return (
    <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
  );
};
