import { SVGProps } from "react";
import Svg from "../svgs/public.svg";

const PublicIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="public"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default PublicIcon;