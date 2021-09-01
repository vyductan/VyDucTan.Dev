import { useRef, useState } from "react";
import { ResumeData } from "../config/resumeData";
import useHandleOutsideClick from "./@vyductan/hooks/useHandleOutsideClick";
import Icon from "./@vyductan/Icon";
// import TypeWriter from "react-typewriter";
import TypeWriter from "typewriter-effect";
import { IconName } from "./@vyductan/Icon/Icon";
import { Link } from "react-scroll";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import Image from "next/image";

type HeaderProps = {
  data: ResumeData["main"];
};
const Header = ({ data }: HeaderProps) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useHandleOutsideClick(ref, visible, () => setVisible(false));

  useScrollPosition(({ currPos }) => {
    const elm = document.getElementById("nav");
    if (currPos.y < -100) {
      // if (elm) elm.style.backgroundColor = "rbg(0 0 0 / 40%)";
      // if (elm) elm.style.backgroundColor = "rgb(0 0 0 / 70%)";
      if (elm) elm.style.display = "none";
    }
    if (currPos.y < -window.innerHeight + 10) {
      if (elm) elm.style.display = "";
      if (elm) elm.style.backgroundColor = "#000";
    }
    if (currPos.y > -100) {
      if (elm) elm.style.display = "";
      if (elm) elm.style.backgroundColor = "";
      // if (elm) elm.style.backgroundColor = "transparent";
      // if (elm) elm.classList.add("bg-blur-30");
    }
  }, []);

  if (!data) return <></>;
  const { name, occupation, description } = data;
  // const city = data.address.city;
  const networks = data.social.map(function (network) {
    return (
      <li key={network.name}>
        <a href={network.url} aria-label={network.name}>
          <Icon name={network.iconName as IconName} />
        </a>
      </li>
    );
  });

  return (
    <header
      id="home"
      style={{
        backgroundColor: "#161415",
        backgroundImage: `url(/header-background-10.webp)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
      className="h-screen flex flex-col"
    >
      <nav ref={ref} id="nav" className="nav">
        <div className="logo">
          <Image alt="logo" src="/logo.png" width={67} height={40} />
        </div>

        <button
          className="nav-toggle"
          onClick={() => setVisible(!visible)}
          aria-label="Menu"
        >
          <Icon name="Menu" />
        </button>

        <ul className={`${!visible && "hidden"}`}>
          <li className="current">
            <Link
              className="uppercase"
              activeClass="active"
              to="home"
              smooth={true}
              spy={true}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="uppercase"
              activeClass="active"
              to="about"
              smooth={true}
              spy={true}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="uppercase"
              activeClass="active"
              to="resume"
              smooth={true}
              spy={true}
            >
              Resume
            </Link>
          </li>
          <li>
            <Link
              className="uppercase"
              activeClass="active"
              to="portfolio"
              smooth={true}
              spy={true}
            >
              Works
            </Link>
          </li>
          <li>
            <Link
              className="uppercase"
              activeClass="active"
              to="testimonials"
              smooth={true}
              spy={true}
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              className="uppercase"
              activeClass="active"
              to="contact"
              smooth={true}
              spy={true}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex-grow flex items-center justify-center">
        <div className="p-10 md:p-20 bg-gray-900 bg-opacity-40 rounded">
          <h1 className="text-white text-[40px] sm:text-[65px] md:text-[80px] lg:text-[100px] leading-normal font-bold text-center">
            <TypeWriter
              options={{
                strings: `I'm ${name}.`,
                autoStart: true,
                cursor: "",
                delay: 100,
              }}
            />
          </h1>
          <h2 className="text-[#d6d6d6] text-center text-base sm:text-lg md:text-xl lg:text-2xl font-serif max-w-[90%] md:max-w-[100%] m-auto">
            Based in VietNam.{" "}
            <span className="text-white shadow">{occupation}</span>.{" "}
            {description}.
          </h2>
          <hr className="my-5 border-[#9696961a]" />
          <ul className="networks">{networks}</ul>
        </div>
      </div>

      <div className="flex justify-center mb-2 md:mb-10">
        <Link
          className="icon hover:bg-[#000] hover:text-white"
          to="about"
          smooth={true}
        >
          <Icon name="ArrowDown2" className="w-7 h-7 md:w-10 md:h-10" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
