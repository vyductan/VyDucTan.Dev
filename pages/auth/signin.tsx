import { GetServerSideProps } from "next";
import Image from "next/image";
import { getProviders, getSession, signIn } from "next-auth/client";
import logo from "../../public/logo.png";
import Icon from "../../@vyductan/Icon";
import { IconName } from "../../@vyductan/Icon/Icon";
type SignInProps = {
  providers: Array<{
    name: string;
    id: string;
  }>;
};
export default function SignIn({ providers }: SignInProps) {
  return (
    <>
      <div className="grid place-items-center mt-24">
        <Image
          alt="logo"
          src={logo}
          width={150}
          height={150}
          // objectFit="contain"
        />
        <hr className="my-6 border-gray-300 w-80" />
        <div>
          {Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              className="button-login-with"
              onClick={() => signIn(provider.id)}
            >
              <Icon name={`${provider.name}Ori` as IconName} />
              Log in with {provider.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export const getServerSideProps: GetServerSideProps = async (context) => {
  let session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
