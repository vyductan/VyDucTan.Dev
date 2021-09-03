import { Popconfirm, Tooltip } from "antd";
import { Icon } from "../icons";

type ButtonActionProps = {
  // type: keyof typeof actionMap;
  type: "add" | "edit" | "remove";
  onClick?: () => void;
};
const ButtonAction = ({ type, onClick }: ButtonActionProps) => {
  const actionMap = {
    add: (
      <Tooltip title="Add">
        <button
          className="bg-blue-5 hover:bg-blue-4 btn-icon"
          onClick={onClick}
        >
          <Icon name="Add" />
        </button>
      </Tooltip>
    ),
    edit: (
      <Tooltip title="Edit">
        <button
          className="bg-gold-5 hover:bg-gold-4 btn-icon"
          onClick={onClick}
        >
          <Icon name="EditOutline" />
        </button>
      </Tooltip>
    ),
    remove: (
      <Tooltip title="Remove">
        <Popconfirm title="Are you sure?" onConfirm={onClick}>
          <button className="bg-red-5 hover:bg-red-4 btn-icon">
            <Icon name="TrashOutline" />
          </button>
        </Popconfirm>
      </Tooltip>
    ),
  };
  return actionMap[type];
};

export default ButtonAction;
