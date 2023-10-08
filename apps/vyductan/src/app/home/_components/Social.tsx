import { FacebookIcon, GithubIcon, LinkedinIcon } from "@vyductan/icons";

import { type ResumeData } from "../resumeData";

const IconMap = {
  facebook: <FacebookIcon />,
  linkedin: <LinkedinIcon />,
  github: <GithubIcon />,
};
type SocialProps = {
  social: ResumeData["main"]["social"];
};
const Social = ({ social }: SocialProps) => {
  return (
    <>
      {social.map((network) => {
        return (
          <li key={network.name}>
            <a
              href={network.url}
              aria-label={network.name}
            >
              {IconMap[network.iconName as keyof typeof IconMap]}
            </a>
          </li>
        );
      })}
    </>
  );
};

export default Social;
