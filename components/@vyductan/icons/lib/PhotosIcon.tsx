import { SVGProps } from "react";
import Svg from "../svgs/photos.svg";

const PhotosIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="photos"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default PhotosIcon;