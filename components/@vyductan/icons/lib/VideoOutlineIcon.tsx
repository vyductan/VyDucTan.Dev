import { SVGProps } from "react";
import Svg from "../svgs/video-outline.svg";

const VideoOutlineIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="video-outline"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default VideoOutlineIcon;