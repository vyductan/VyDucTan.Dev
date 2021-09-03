import { SVGProps } from "react";
import Svg from "../svgs/mail.svg";

const MailIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="mail"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default MailIcon;