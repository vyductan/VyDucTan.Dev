import { SVGProps } from "react";
import Svg from "../svgs/trash-outline.svg";

const TrashOutlineIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="trash-outline"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default TrashOutlineIcon;