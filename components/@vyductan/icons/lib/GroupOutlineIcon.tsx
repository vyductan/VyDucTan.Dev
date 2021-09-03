import { SVGProps } from "react";
import Svg from "../svgs/group-outline.svg";

const GroupOutlineIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="group-outline"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default GroupOutlineIcon;