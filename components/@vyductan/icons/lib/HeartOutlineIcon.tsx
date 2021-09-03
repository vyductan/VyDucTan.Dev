import { SVGProps } from "react";
import Svg from "../svgs/heart-outline.svg";

const HeartOutlineIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="heart-outline"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default HeartOutlineIcon;