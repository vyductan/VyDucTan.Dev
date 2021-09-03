import { SVGProps } from "react";
import Svg from "../svgs/phone.svg";

const PhoneIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="phone"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default PhoneIcon;