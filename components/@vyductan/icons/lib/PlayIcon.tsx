import { SVGProps } from "react";
import Svg from "../svgs/play.svg";

const PlayIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="play"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default PlayIcon;