import * as React from "react";

function SvgExitIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="exit-icon_svg__icon"
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
      <path d="M768 640V512H448V384h320V256l192 192zm-64-64v256H384v192L0 832V0h704v320h-64V64H128l256 128v576h256V576z" />
    </svg>
  );
}

export default SvgExitIcon;
