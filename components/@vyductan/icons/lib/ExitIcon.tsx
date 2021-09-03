import { SVGProps } from "react";
import Svg from "../svgs/exit.svg";

const ExitIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="exit"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default ExitIcon;