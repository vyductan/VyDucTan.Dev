import { SVGProps } from "react";
import Svg from "../svgs/video-camera-outline.svg";

const VideoCameraOutlineIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="video-camera-outline"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default VideoCameraOutlineIcon;