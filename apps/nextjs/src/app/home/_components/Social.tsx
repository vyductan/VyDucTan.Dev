import { Icon } from "@acme/ui/icons";

import type { ResumeData } from "../resumeData";

const IconMap = {
  facebook: <Icon icon="entypo-social:facebook" />,
  linkedin: <Icon icon="fa-brands:linkedin" />,
  github: <Icon icon="jam:github" />,
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
            <a href={network.url} aria-label={network.name}>
              {IconMap[network.iconName as keyof typeof IconMap]}
            </a>
          </li>
        );
      })}
    </>
  );
};

export default Social;
