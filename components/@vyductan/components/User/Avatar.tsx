import Image from "next/image";
import { useSession } from "next-auth/client";
import Icon from "../../icons";

const Avatar = ({ width = 40, height = 40 }) => {
  const [session] = useSession();
  return (
    <>
      {session && session.user?.image ? (
        <Image
          className="rounded-full"
          alt="avatar"
          src={session.user.image}
          width={width}
          height={height}
        />
      ) : (
        <Icon name="Avatar" />
      )}
    </>
  );
};
export default Avatar;
