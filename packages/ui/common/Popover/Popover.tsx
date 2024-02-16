import { Fragment, useState, type ElementType, type ReactNode } from "react";
import {
  Popover as HeadlessUIPopover,
  Transition,
  type PopoverButtonProps,
} from "@headlessui/react";
import { type Placement } from "@popperjs/core";
import { clsm } from "@vyductan/react";
import { usePopper } from "react-popper";

import { PopoverProvider, usePopoverContext } from "./context";

type PopoverProps = {
  className?: string;
  placement?: Placement;
  children: ReactNode;
};
const PopoverComponent = ({
  className = "",
  placement,
  children,
}: PopoverProps) => {
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 12],
        },
      },
    ],
  });

  return (
    <PopoverProvider
      value={{
        setReferenceElement,
        setPopperElement,
        stylesPopper: styles.popper,
        attributesPopper: attributes.popper,
      }}
    >
      <HeadlessUIPopover className={clsm("relative", className)}>
        {children}
      </HeadlessUIPopover>
    </PopoverProvider>
  );
};

const DEFAULT_BUTTON_TAG = "button" as const;

const PopoverButton = <TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>({
  ...restProps
}: PopoverButtonProps<TTag>) => {
  const { setReferenceElement } = usePopoverContext();
  return (
    <HeadlessUIPopover.Button
      ref={setReferenceElement}
      {...restProps}
    />
  );
};

type PopoverPanelProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};
const PopoverPanel = ({
  children,
  className = "",
  ...restProps
}: PopoverPanelProps) => {
  const { setPopperElement, stylesPopper, attributesPopper } =
    usePopoverContext();

  return (
    <Transition
      as={Fragment}
      enter="tw-transition-opacity tw-ease-out tw-duration-200"
      enterFrom="tw-opacity-0"
      enterTo="tw-opacity-100"
      leave="tw-transition-opacity tw-ease-in tw-duration-150"
      leaveFrom="tw-opacity-100"
      leaveTo="tw-opacity-0"
    >
      <HeadlessUIPopover.Panel
        className={clsm(
          className,
          "z-10 px-4",
          "rounded-lg bg-white shadow-lg ring-1 ring-black/5",
        )}
        ref={setPopperElement}
        style={stylesPopper}
        {...attributesPopper}
        {...restProps}
      >
        {children}
      </HeadlessUIPopover.Panel>
    </Transition>
  );
};

export const Popover = Object.assign(PopoverComponent, {
  Button: PopoverButton,
  Panel: PopoverPanel,
});
