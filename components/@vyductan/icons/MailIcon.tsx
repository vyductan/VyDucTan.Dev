import * as React from 'react';

function SvgMailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="mail-icon_svg__icon"
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
      <path d="M367.206 580.3l144.896 99.073 139.674-96.359 313.088 308.89c-8.243 2.662-17.05 4.096-26.214 4.096H85.35a85.868 85.868 0 01-31.897-6.144l313.753-309.555zM1024 326.452V810.65a85.299 85.299 0 01-7.68 35.43L709.427 543.283 1024 326.451zM0 329.165l309.35 211.558L5.427 840.653A85.146 85.146 0 010 810.65V329.216zM938.65 128c47.104 0 85.35 38.195 85.35 85.35v30.004L511.898 596.378 0 246.272V213.35C0 166.246 38.195 128 85.35 128h853.3z" />
    </svg>
  );
}

export default SvgMailIcon;
