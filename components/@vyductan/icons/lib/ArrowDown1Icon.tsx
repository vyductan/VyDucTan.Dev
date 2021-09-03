import { SVGProps } from "react";
import Svg from "../svgs/arrow-down-1.svg";

const ArrowDown1Icon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="arrow-down-1"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default ArrowDown1Icon;