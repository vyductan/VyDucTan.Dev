import { SVGProps } from "react";
import Svg from "../svgs/heart-solid.svg";

const HeartSolidIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="heart-solid"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default HeartSolidIcon;