import * as React from "react";

function SvgFacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="facebook-icon_svg__icon"
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
      <path d="M932.571 54.857H91.43C71.2 54.857 54.857 71.2 54.857 91.43V932.57c0 20.229 16.343 36.572 36.572 36.572H932.57c20.229 0 36.572-16.343 36.572-36.572V91.43c0-20.229-16.343-36.572-36.572-36.572zm-105.6 266.857h-73.028c-57.257 0-68.343 27.2-68.343 67.2v88.115h136.686L804.457 614.97H685.6v354.172H543.086V615.086h-119.2V477.029h119.2V375.314c0-118.057 72.114-182.4 177.485-182.4 50.515 0 93.829 3.772 106.515 5.486v123.314z" />
    </svg>
  );
}

export default SvgFacebookIcon;
