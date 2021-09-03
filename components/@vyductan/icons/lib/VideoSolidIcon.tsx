import { SVGProps } from "react";
import Svg from "../svgs/video-solid.svg";

const VideoSolidIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="video-solid"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default VideoSolidIcon;