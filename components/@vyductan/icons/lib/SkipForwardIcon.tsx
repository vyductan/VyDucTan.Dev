import { SVGProps } from "react";
import Svg from "../svgs/skip-forward.svg";

const SkipForwardIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="skip-forward"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default SkipForwardIcon;