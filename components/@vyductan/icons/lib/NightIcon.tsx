import { SVGProps } from "react";
import Svg from "../svgs/night.svg";

const NightIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="night"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default NightIcon;