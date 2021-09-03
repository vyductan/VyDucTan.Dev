import { SVGProps } from "react";
import Svg from "../svgs/video-camera-solid.svg";

const VideoCameraSolidIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="video-camera-solid"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default VideoCameraSolidIcon;