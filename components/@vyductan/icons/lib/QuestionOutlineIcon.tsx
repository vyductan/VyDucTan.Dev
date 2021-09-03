import { SVGProps } from "react";
import Svg from "../svgs/question-outline.svg";

const QuestionOutlineIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="question-outline"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default QuestionOutlineIcon;