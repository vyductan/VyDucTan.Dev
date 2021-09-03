import { SVGProps } from "react";
import Svg from "../svgs/arrow-up-3.svg";

const ArrowUp3Icon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="arrow-up-3"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default ArrowUp3Icon;