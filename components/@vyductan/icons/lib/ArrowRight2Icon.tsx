import { SVGProps } from "react";
import Svg from "../svgs/arrow-right-2.svg";

const ArrowRight2Icon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="arrow-right-2"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default ArrowRight2Icon;