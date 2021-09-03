import { SVGProps } from "react";
import Svg from "../svgs/time-memory.svg";

const TimeMemoryIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="time-memory"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default TimeMemoryIcon;