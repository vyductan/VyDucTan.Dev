import { SVGProps } from "react";
import Svg from "../svgs/home-solid.svg";

const HomeSolidIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="home-solid"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default HomeSolidIcon;