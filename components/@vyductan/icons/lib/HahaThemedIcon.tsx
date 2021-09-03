import { SVGProps } from "react";
import Svg from "../svgs/haha-themed.svg";

const HahaThemedIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="haha-themed"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default HahaThemedIcon;