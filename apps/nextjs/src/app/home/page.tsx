import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { FloatButtonBackToTop } from "@acme/ui/float-button";

import { resumeData } from "./resume-data";

const Header = dynamic(() => import("./_components/Header"));
const About = dynamic(() => import("./_components/About"));
const Resume = dynamic(() => import("./_components/Resume"));
const Portfolio = dynamic(() => import("./_components/Portfolio"));
const Contact = dynamic(() => import("./_components/Contact"));
const Footer = dynamic(() => import("./_components/Footer"));

export const metadata: Metadata = {
  title: "VyDucTan.Dev",
  description: "vyductan.dev",
};

export default function HomePage() {
  return (
    <div>
      <main>
        <Header data={resumeData.main} />
        <About data={resumeData.main} />
        <Resume data={resumeData.resume} />
        <Portfolio data={resumeData.portfolio} />
        <Footer data={resumeData.main} />
        <Contact data={resumeData.main} />
      </main>
      <FloatButtonBackToTop tooltip="Back to Top" />
    </div>
  );
}
