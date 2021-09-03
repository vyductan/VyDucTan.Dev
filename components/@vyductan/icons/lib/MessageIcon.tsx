import { SVGProps } from "react";
import Svg from "../svgs/message.svg";

const MessageIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="message"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default MessageIcon;