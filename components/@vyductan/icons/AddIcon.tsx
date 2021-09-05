import * as React from 'react';

function SvgAddIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      data-icon="add"
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
      <path d="M810.667 554.667h-256v256h-85.334v-256h-256v-85.334h256v-256h85.334v256h256v85.334z" />
    </svg>
  );
}

export default SvgAddIcon;
