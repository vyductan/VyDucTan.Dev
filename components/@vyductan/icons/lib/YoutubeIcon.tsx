import { SVGProps } from "react";
import Svg from "../svgs/youtube.svg";

const YoutubeIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="youtube"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default YoutubeIcon;