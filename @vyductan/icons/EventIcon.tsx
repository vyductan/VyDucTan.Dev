import * as React from 'react';

function SvgEventIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="event-icon_svg__icon"
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
      <path d="M725.333 512H512v213.333h213.333V512zM682.667 42.667V128H341.333V42.667H256V128h-42.667C166.4 128 128 166.4 128 213.333v597.334C128 857.6 166.4 896 213.333 896h597.334C857.6 896 896 857.6 896 810.667V213.333C896 166.4 857.6 128 810.667 128H768V42.667h-85.333zm128 768H213.333V341.333h597.334v469.334z" />
    </svg>
  );
}

export default SvgEventIcon;
