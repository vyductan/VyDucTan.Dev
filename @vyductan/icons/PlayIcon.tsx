import * as React from 'react';

function SvgPlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="play-icon_svg__icon"
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
      <path d="M256 832c-11.712 0-23.36-3.2-33.664-9.536A64.17 64.17 0 01192 768V256a64.089 64.089 0 0130.336-54.464 64.299 64.299 0 0162.272-2.816l512 256a64.064 64.064 0 010 114.56l-512 256c-8.96 4.48-18.88 6.72-28.608 6.72z" />
    </svg>
  );
}

export default SvgPlayIcon;
