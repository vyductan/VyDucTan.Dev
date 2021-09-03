import { SVGProps } from "react";
import Svg from "../svgs/skip-backward.svg";

const SkipBackwardIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="skip-backward"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default SkipBackwardIcon;