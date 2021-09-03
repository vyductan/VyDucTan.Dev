import { SVGProps } from "react";
import Svg from "../svgs/quote-left.svg";

const QuoteLeftIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="quote-left"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default QuoteLeftIcon;