import * as React from "react";

function SvgFacebookOriIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="facebook-ori-icon_svg__icon"
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
      <path
        d="M967.601 1024c31.077 0 56.399-25.322 56.399-56.399V56.4C1024 25.322 998.678 0 967.601 0H56.4C25.322 0 0 25.322 0 56.399v910.819c0 31.076 25.322 56.398 56.399 56.398H967.6z"
        fill="#3C5A99"
      />
      <path
        d="M706.71 1024V627.291H839.84l19.95-154.617H706.71v-98.601c0-44.889 12.277-75.199 76.732-75.199h81.721V160.755c-14.196-1.918-62.921-6.138-119.32-6.138-118.168 0-198.738 72.129-198.738 204.11v113.947H413.59v154.617h133.515V1024H706.71z"
        fill="#FFF"
      />
    </svg>
  );
}

export default SvgFacebookOriIcon;
