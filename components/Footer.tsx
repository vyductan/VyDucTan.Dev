import { Link } from "react-scroll";
import { ResumeData } from "../config/resumeData";
import Icon from "./@vyductan/Icon";
import { IconName } from "./@vyductan/Icon/Icon";

type FooterProps = {
  data: ResumeData["main"];
};
const Footer = ({ data }: FooterProps) => {
  if (!data) return <></>;
  const { website } = data;
  const networks = data.social.map(function (network) {
    return (
      <li key={network.name}>
        <a href={network.url}>
          <Icon name={network.iconName as IconName} />
        </a>
      </li>
    );
  });
  return (
    <footer className="relative">
      <div className="container">
        <ul className="networks">{networks}</ul>

        <div className="text-white mt-10">
          <span className="opacity-50">
            {`© ${new Date().getFullYear()} `}
            Made by{" "}
          </span>
          <a title="PAPA" href={website}>
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
            <Icon name="ArrowUp2" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
