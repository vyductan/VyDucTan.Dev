import { SVGProps } from "react";
import AddSvg from "./svgs/add.svg";

const AddIcon = (props: SVGProps<SVGElement>) => (
  <AddSvg fill="currentcolor" {...props} />
);

export default AddIcon;
