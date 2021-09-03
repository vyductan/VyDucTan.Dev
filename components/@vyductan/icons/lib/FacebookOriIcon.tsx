import { SVGProps } from "react";
import Svg from "../svgs/facebook-ori.svg";

const FacebookOriIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="facebook-ori"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default FacebookOriIcon;