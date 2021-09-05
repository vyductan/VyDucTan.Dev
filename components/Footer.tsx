import { Link } from "react-scroll";
import type { ResumeData } from "../config/resumeData";
import { ArrowUp2Icon } from "./@vyductan/icons";
import Social from "./Index/common/Social";

type FooterProps = {
  data: ResumeData["main"];
};
const Footer = ({ data }: FooterProps) => {
  if (!data) return <></>;
  const { website } = data;

  return (
    <footer className="relative">
      <div className="container">
        <ul className="networks">
          <Social social={data.social} />
        </ul>

        <div className="text-white mt-10">
          <span className="opacity-50">
            {`© ${new Date().getFullYear()} `}
            Made by{" "}
          </span>
          <a title="VyDucTan" href={website}>
            VyDucTan
          </a>
        </div>

        <div id="go-top" className="absolute -top-5 m-auto">
          <Link
            className="icon hover:bg-[#000] hover:text-white"
            to="home"
            smooth={true}
            title="Back to Top"
          >
            <ArrowUp2Icon />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
