import { CodeBlock } from "@acme/ui/code-block";

export default function Page() {
  return (
    <div>
      <div>
        <div>s3Client</div>
        <CodeBlock>
          {`
export const createS3Client = () => {
  const client = new S3Client({
    forcePathStyle: true,
    // region: env.VITE_APP_SUPABASE_REGION,
    region: "ap-northeast-1",
    endpoint: env.VITE_APP_SUPABASE_URL + "/storage/v1/s3",
    credentials: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      return {
        accessKeyId: env.VITE_APP_SUPABASE_URL.slice(8).replace(
          ".supabase.co",
          "",
        ),
        secretAccessKey: env.VITE_APP_SUPABASE_ANON_KEY,
        sessionToken: session?.access_token,
      };
    },
  });
  return client;
};
      `}
        </CodeBlock>
      </div>
    </div>
  );
}
