import { SVGProps } from "react";
import Svg from "../svgs/edit-outline.svg";

const EditOutlineIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="edit-outline"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default EditOutlineIcon;