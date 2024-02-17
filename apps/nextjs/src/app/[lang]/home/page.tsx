// "use client";
import Head from "next/head";

import About from "./_components/About";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Portfolio from "./_components/Portfolio";
import Resume from "./_components/Resume";
import { resumeData } from "./resumeData";

// const Header = dynamic(() => import("../components/Header"));
// const About = dynamic(() => import("../components/About"));
// const Resume = dynamic(() => import("../components/Resume"));
// const Portfolio = dynamic(() => import("../components/Portfolio"));
// const Contact = dynamic(() => import("../components/Contact"));
// const Footer = dynamic(() => import("../components/Footer"));

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>VyDucTan.Me</title>
        <meta name="description" content="vyductan.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/*<Header data={resumeData.main} />
        <About data={resumeData.main} />
        <Resume data={resumeData.resume} />
        <Portfolio data={resumeData.portfolio} />
        <Testimonials data={resumeData.testimonials} />
        <Footer data={resumeData.main} />*/}
        <Contact data={resumeData.main} />
      </main>
    </div>
  );
};

export default HomePage;
