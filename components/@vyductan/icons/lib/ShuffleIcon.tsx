import { SVGProps } from "react";
import Svg from "../svgs/shuffle.svg";

const ShuffleIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="shuffle"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default ShuffleIcon;