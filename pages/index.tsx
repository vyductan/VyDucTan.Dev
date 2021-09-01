import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { Session } from "next-auth";
import Head from "next/head";
import { ResumeData, resumeData } from "../config/resumeData";
//import Header from "../components/Header";
// import About from "../components/About";
// import Resume from "../components/Resume";
// import Portfolio from "../components/Portfolio";
// import Testimonials from "../components/Testimonials";
// import Contact from "../components/Contact";
// import Footer from "../components/Footer";
const Header = dynamic(() => import("../components/Header"));
const About = dynamic(() => import("../components/About"));
const Resume = dynamic(() => import("../components/Resume"));
const Portfolio = dynamic(() => import("../components/Portfolio"));
const Contact = dynamic(() => import("../components/Contact"));
const Footer = dynamic(() => import("../components/Footer"));

type HomeProps = {
  session: Session;
  data: ResumeData;
};
export default function Home({ data }: HomeProps) {
  return (
    <div>
      <Head>
        <title>VyDucTan.Me</title>
        <meta name="description" content="vyductan.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header data={data.main} />
        <About data={data.main} />
        <Resume data={resumeData.resume} />
        <Portfolio data={resumeData.portfolio} />
        {/*<Testimonials data={resumeData.testimonials} />*/}
        <Contact data={resumeData.main} />
        <Footer data={resumeData.main} />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      data: resumeData,
    },
  };
};
