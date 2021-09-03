import { SVGProps } from "react";
import Svg from "../svgs/pause.svg";

const PauseIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="pause"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default PauseIcon;