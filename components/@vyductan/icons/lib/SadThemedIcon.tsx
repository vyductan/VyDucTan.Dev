import { SVGProps } from "react";
import Svg from "../svgs/sad-themed.svg";

const SadThemedIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="sad-themed"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default SadThemedIcon;