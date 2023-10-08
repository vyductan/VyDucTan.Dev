import * as React from "react";

function SvgLinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="linkedin-icon_svg__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      aria-hidden="true"
      fill="currentColor"
      {...props}
    >
      <defs>
        <style />
      </defs>
      <path d="M852 0H172C77.408 0 0 77.408 0 172v680c0 94.592 77.408 172 172 172h680c94.592 0 172-77.408 172-172V172c0-94.592-77.408-172-172-172zM384 832H256V384h128v448zm-64-512c-35.36 0-64-28.64-64-64s28.64-64 64-64 64 28.64 64 64-28.64 64-64 64zm512 512H704V576c0-35.36-28.64-64-64-64s-64 28.64-64 64v256H448V384h128v79.456C602.4 427.2 642.752 384 688 384c79.52 0 144 71.648 144 160v288z" />
    </svg>
  );
}

export default SvgLinkedinIcon;
