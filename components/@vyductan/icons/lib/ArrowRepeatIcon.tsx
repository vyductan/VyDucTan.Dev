import { SVGProps } from "react";
import Svg from "../svgs/arrow-repeat.svg";

const ArrowRepeatIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="arrow-repeat"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default ArrowRepeatIcon;