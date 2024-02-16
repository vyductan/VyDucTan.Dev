import { useRef } from "react";
import { useButton, type AriaButtonProps } from "@react-aria/button";

import { Button } from "../Button";

type CalendarButtonProps = AriaButtonProps;
export const CalendarButton = (props: CalendarButtonProps) => {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  return <Button {...buttonProps}>{props.children}</Button>;
};
