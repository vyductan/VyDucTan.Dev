import { SVGProps } from "react";
import Svg from "../svgs/love-themed.svg";

const LoveThemedIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="love-themed"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default LoveThemedIcon;