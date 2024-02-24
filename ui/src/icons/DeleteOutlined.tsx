import type { IconProps } from "./Icon";
import { Icon } from "./Icon";

type DeleteOutlinedProps = Omit<IconProps, "icon">;
export const DeleteOutlined = (props: DeleteOutlinedProps) => {
  return <Icon icon="lucide:trash-2" {...props} />;
};
