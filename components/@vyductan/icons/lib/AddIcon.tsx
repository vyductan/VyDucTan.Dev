import { SVGProps } from "react";
import Svg from "../svgs/add.svg";

const AddIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="add"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default AddIcon;