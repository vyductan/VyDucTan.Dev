import { SVGProps } from "react";
import Svg from "../svgs/arrow-left-3.svg";

const ArrowLeft3Icon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="arrow-left-3"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default ArrowLeft3Icon;