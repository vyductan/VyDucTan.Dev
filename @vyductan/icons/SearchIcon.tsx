import * as React from 'react';

function SvgSearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="search-icon_svg__icon"
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
      <path d="M416 192c121.6 0 224 102.4 224 224S537.6 640 416 640 192 537.6 192 416s102.4-224 224-224m0-64c-160 0-288 128-288 288s128 288 288 288 288-128 288-288-128-288-288-288z" />
      <path d="M832 864c-6.4 0-19.2 0-25.6-6.4l-192-192c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0l192 192c12.8 12.8 12.8 32 0 44.8 0 6.4-12.8 6.4-19.2 6.4z" />
    </svg>
  );
}

export default SvgSearchIcon;
