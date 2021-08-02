import { useSession } from "next-auth/client";

const Name = ({ className }: { className?: string }) => {
  const [session] = useSession();
  return (
    <div className={`whitespace-nowrap font-semibold ${className}`}>
      {session && session.user?.name ? session.user.name : "No Name"}
    </div>
  );
};

export default Name;
