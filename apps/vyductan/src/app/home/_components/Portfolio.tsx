import Image from "next/image";
<<<<<<<< HEAD:apps/nextjs/src/app/home/_components/Portfolio.tsx

import { Icon } from "@vyductan/icons";

import type { ResumeData } from "../resumeData";
========
import { LinkIcon } from "@vyductan/icons";
>>>>>>>> main:apps/vyductan/src/app/home/_components/Portfolio.tsx

import { type ResumeData } from "../resumeData";

type PortfolioProps = {
  data: ResumeData["portfolio"];
};
const Portfolio = ({ data }: PortfolioProps) => {
  if (!data) return <></>;
  const projects = data.projects.map(function (projects) {
    const projectImage = "/images/portfolio/" + projects.image;
    return (
      <div
        key={projects.title}
        className="image-effect-zoom-with-meta"
      >
        <a
          href={projects.url}
          title={projects.title}
        >
          <Image
            alt={projects.title}
            src={projectImage}
            width={1280}
            height={800}
          />
          <div className="portfolio-item-meta meta">
            <Icon icon="uil:link" />
            <h5 className="meta-title">{projects.title}</h5>
            <p>{projects.category}</p>
          </div>
        </a>
      </div>
    );
  });
  return (
    <section id="portfolio">
      <div className="portfolio-row">
        <h1>Check Out Some of My Works.</h1>

        <div
          // id="portfolio-wrapper"
          className="portfolio-detail"
        >
          {projects}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
