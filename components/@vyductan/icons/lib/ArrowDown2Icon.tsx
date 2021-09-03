import { SVGProps } from "react";
import Svg from "../svgs/arrow-down-2.svg";

const ArrowDown2Icon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="arrow-down-2"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default ArrowDown2Icon;