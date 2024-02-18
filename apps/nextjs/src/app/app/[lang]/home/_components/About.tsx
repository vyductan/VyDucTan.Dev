import Image from "next/image";

import { Icon } from "@vyductan/icons";

import type { ResumeData } from "../resumeData";

type AboutProps = {
  data: ResumeData["main"];
};
const About = ({ data }: AboutProps) => {
  const { name, image, bio, address, phone, email, resumeDownload } = data;
  const profilepic = "/" + image;
  return (
    <section id="about" className="bg-[#2B2B2B]">
      <div className="m-auto max-w-[1024px] lg:flex">
        <div className="relative m-auto mb-3 size-[100px] lg:mt-0 lg:size-[150px]">
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
          <div className="mt-10 flex flex-wrap">
            <div className="mb-10 mr-10">
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
                <Icon icon="mingcute:download-2-fill" className="text-3xl" />
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
