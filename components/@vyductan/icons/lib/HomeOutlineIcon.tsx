import { SVGProps } from "react";
import Svg from "../svgs/home-outline.svg";

const HomeOutlineIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="home-outline"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default HomeOutlineIcon;