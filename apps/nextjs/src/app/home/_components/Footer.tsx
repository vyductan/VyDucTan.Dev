import type { ResumeData } from "../resume-data";
import Social from "./Social";

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

        <div className="mt-10 text-white">
          <span className="opacity-50">
            {`© ${new Date().getFullYear()} `}
            Made by{" "}
          </span>
          <a title="VyDucTan" href={website}>
            VyDucTan
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
