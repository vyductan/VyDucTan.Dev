import { SVGProps } from "react";
import Svg from "../svgs/angry-themed.svg";

const AngryThemedIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="angry-themed"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default AngryThemedIcon;