import { LinkPlugin as LexicalLinkPlugin } from "@lexical/react/LexicalLinkPlugin";

const urlRegExp = new RegExp(
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
);
export function validateUrl(url: string): boolean {
  return url === "https://" || urlRegExp.test(url);
}

export const LinkPlugin = () => {
  return <LexicalLinkPlugin validateUrl={validateUrl} />;
};
