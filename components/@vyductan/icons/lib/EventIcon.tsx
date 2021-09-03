import { SVGProps } from "react";
import Svg from "../svgs/event.svg";

const EventIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="event"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default EventIcon;