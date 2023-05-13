import { DownloadIcon } from "@vyductan/icons";
import Image from "next/image";

import { type ResumeData } from "../config/resumeData";

type AboutProps = {
  data: ResumeData["main"];
};
const About = ({ data }: AboutProps) => {
  const { name, image, bio, address, phone, email, resumeDownload } = data;
  const profilepic = "/" + image;
  return (
    <section id="about" className="bg-[#2B2B2B]">
      <div className="max-w-[1024px] m-auto lg:flex">
        <div className="relative w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] m-auto mb-3 lg:mt-0">
          <Image
            className="rounded-full object-cover"
            src={profilepic}
            alt="VyDucTan's Profile Pic"
            fill={true}
          />
        </div>
        <div className="flex-1  lg:ml-28">
          <h2>About Me</h2>
          <p>{bio}</p>
          <div className="flex flex-wrap mt-10">
            <div className="mr-10 mb-10">
              <h2>Contact Details</h2>
              <p className="address">
                <span>{name}</span>
                <br />
                <span>
                  {address.street}
                  <br />
                  {address.state}, {address.zip}
                </span>
                <br />
                <span>{phone}</span>
                <br />
                <span>{email}</span>
              </p>
            </div>
            <div>
              <a href={resumeDownload} className="btn-download">
                <DownloadIcon className="text-3xl" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
