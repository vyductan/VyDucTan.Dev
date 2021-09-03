import { SVGProps } from "react";
import Svg from "../svgs/instagram.svg";

const InstagramIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="instagram"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default InstagramIcon;