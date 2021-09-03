import { SVGProps } from "react";
import Svg from "../svgs/question-solid.svg";

const QuestionSolidIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="question-solid"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default QuestionSolidIcon;