import { SVGProps } from "react";
import Svg from "../svgs/wow-themed.svg";

const WowThemedIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="wow-themed"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default WowThemedIcon;