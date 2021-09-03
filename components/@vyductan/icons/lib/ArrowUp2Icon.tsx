import { SVGProps } from "react";
import Svg from "../svgs/arrow-up-2.svg";

const ArrowUp2Icon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="arrow-up-2"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default ArrowUp2Icon;