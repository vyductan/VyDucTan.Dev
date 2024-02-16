import * as React from "react";

function SvgPhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="phone-icon_svg__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      aria-hidden="true"
      fill="currentColor"
      {...props}
    >
      <defs>
        <style>
          {
            "@font-face{font-family:feedback-iconfont;src:url(//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.eot?#iefix) format(&quot;embedded-opentype&quot;),url(//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff2) format(&quot;woff2&quot;),url(//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff) format(&quot;woff&quot;),url(//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.ttf) format(&quot;truetype&quot;),url(//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.svg#iconfont) format(&quot;svg&quot;)}"
          }
        </style>
      </defs>
      <path d="M213.704 445.217c77.913 155.826 209.253 282.713 365.079 365.079L701.217 687.86c15.583-15.583 37.844-22.261 55.653-11.13 60.104 22.26 126.887 33.39 198.121 33.39 33.392 0 55.652 22.262 55.652 55.653v186.991c0 33.392-22.26 55.652-55.652 55.652-520.904 0-939.408-418.504-939.408-937.182 0-33.392 22.26-55.652 55.652-55.652h193.67c33.39 0 55.652 22.26 55.652 55.652 0 66.782 11.13 133.565 33.39 198.122 4.453 15.582 0 37.843-11.13 55.652L213.704 445.217z" />
    </svg>
  );
}

export default SvgPhoneIcon;
