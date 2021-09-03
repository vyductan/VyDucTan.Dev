import { SVGProps } from "react";
import Svg from "../svgs/group-solid.svg";

const GroupSolidIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="group-solid"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default GroupSolidIcon;