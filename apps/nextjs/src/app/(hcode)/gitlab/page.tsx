import { CodeBlock } from "@acme/ui/code-block";

export default function Page() {
  return (
    <div>
      <div>
        <div>Using GitLab CI/CD with a GitHub repository</div>
        <CodeBlock>
          {`
          https://docs.gitlab.com/ee/ci/ci_cd_for_external_repos/github_integration.html
          Connect with personal access token
      `}
        </CodeBlock>
      </div>
    </div>
  );
}
