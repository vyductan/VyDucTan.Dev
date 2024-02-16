import { type ReactNode, type SelectHTMLAttributes } from "react";
import { Transition } from "@headlessui/react";
import { clsm, Listbox } from "@vyductan/react";

type SelectRenderPropArgs = {
  open: boolean;
  disabled: boolean;
};
type OptionRenderArgs = {
  active: boolean;
  selected: boolean;
  disabled: boolean;
};
type SelectOption = {
  value: string;
  label: ReactNode;
  addonBefore?: ReactNode | ((args: OptionRenderArgs) => ReactNode);
  addonAfter?: ReactNode;
};
export type SelectOptions = SelectOption[];
export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  // button?: ReactNode
  // children: ReactNode | ((args: SelectRenderPropArgs) => ReactElement)
  // children: ReactNode
  options?: SelectOptions;
  optionsRender?: ReactNode;
  optionsClassName?: string;
  // as?: ElementType
  // value?: string
  onChange?: (value: string) => void;
};

export const Select = ({
  children,
  options,
  optionsRender,
  optionsClassName,
  // as,
  value,
  onChange,
}: SelectProps) => {
  return (
    <Listbox
      as="select"
      // onChange={onChange}
    >
      <div className="relative flex flex-col justify-center">
        <Listbox.Button>
          <>
            {/* {typeof children === 'function' ? (arg) => children(arg) : children} */}
            {children}
            <span className="icon-[heroicons--chevron-up-down]" />
          </>
        </Listbox.Button>
      </div>
    </Listbox>
  );
};

// type Select = typeof ListboxInternal & {
//   Option = typeof ListboxHU.Option
// }
// export const Select = Object.assign(Select, {
//   Option: Select.Option,
//   Options: Select.Options,
// })
