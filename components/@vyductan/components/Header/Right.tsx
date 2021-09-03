import Image from "next/image";
import { Tooltip, Badge } from "antd";
import { signOut, useSession } from "next-auth/client";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import useHandleOutsideClick from "../../hooks/useHandleOutsideClick";
import { Icon } from "../../icons";
import { menuAccount, MenuModalItem } from "./data/menuAccount";

const Right = () => {
  const [session] = useSession();
  const [modalVisiable, setModalVisiable] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useHandleOutsideClick(wrapperRef, modalVisiable, () =>
    setModalVisiable(false)
  );

  const ListMenuItem = ({
    data,
    goNext,
  }: {
    data: MenuModalItem[];
    goNext?: Dispatch<SetStateAction<JSX.Element | undefined>>;
  }) => {
    return (
      <>
        {data.map((x) => {
          return (
            <div
              key={x.name}
              className="flex items-center space-x-3 hover:bg-gray-100 cursor-pointer p-2 rounded-md"
              onClick={() => {
                if (x.children && goNext) {
                  goNext(
                    <ChildModal
                      data={x}
                      onBack={() => {
                        goNext(undefined);
                      }}
                    />
                  );
                }
                if (x.name === "Logout") {
                  signOut();
                }
              }}
            >
              <div className="icon hover:bg-gray-200">
                <Icon name={x.iconName} />
              </div>
              <p className="font-semibold flex-grow">{x.name}</p>
              {x.children && <Icon name="ArrowRight2" className="h-7" />}
            </div>
          );
        })}
      </>
    );
  };
  const AccountModal = () => {
    const [Next, setNext] = useState<JSX.Element>();

    const Root = (
      <div className="divide-y">
        <div className="flex items-center hover:bg-gray-100 space-x-3 p-3 rounded-md cursor-pointer">
          {session && session.user?.image ? (
            <Image
              className="rounded-full"
              alt="avatar"
              src={session.user.image}
              width={60}
              height={60}
            />
          ) : (
            <Icon name="Avatar" />
          )}
          <div>
            <div className="whitespace-nowrap font-semibold text-xl">
              {session && session.user?.name ? session.user.name : "No Name"}
            </div>
            <div className="text-gray-500">View your profile</div>
          </div>
        </div>
        <ListMenuItem data={menuAccount} goNext={setNext} />
      </div>
    );
    return <>{!Next ? Root : Next}</>;
  };

  const ChildModal = ({
    data,
    onBack,
  }: {
    data: MenuModalItem;
    onBack: () => void;
  }) => {
    return (
      <div className="divide-y">
        <div className="flex items-center space-x-3">
          <Icon name="ArrowLeft3" className="icon bg-white" onClick={onBack} />
          <h2 className="text-2xl font-bold">{data.name}</h2>
        </div>
        {data.children ? (
          data.children === "custom" ? null : (
            <ListMenuItem data={data.children} />
          )
        ) : null}
      </div>
    );
  };

  return (
    <>
      <div
        className="flex items-center justify-end
      sm:space-x-2"
      >
        <div className="flex items-center space-x-2 rounded-full cursor-pointer hover:bg-gray-100 hidden lg:inline-flex">
          {session && session.user?.image ? (
            <Image
              className="rounded-full"
              alt="avatar"
              src={session.user.image}
              width={40}
              height={40}
            />
          ) : (
            <Icon name="Avatar" />
          )}
          <p className="whitespace-nowrap font-semibold pr-3">
            {session && session.user?.name ? session.user.name : "No Name"}
          </p>
        </div>
        <div className="flex space-x-2">
          <Tooltip placement="bottom" title="Menu">
            <div className="icon">
              <Icon name="ViewGrid" />
            </div>
          </Tooltip>
          <Tooltip placement="bottom" title="Message">
            <div className="icon">
              <Icon name="Message" />
            </div>
          </Tooltip>
          <Tooltip placement="bottom" title="Notification" className="icon">
            <Badge offset={[0, 4]} count={10} overflowCount={9}>
              <Icon name="Bell" />
            </Badge>
          </Tooltip>
          <Tooltip placement="bottom" title="Account">
            <div
              className="icon"
              onClick={() => {
                setModalContent(<AccountModal />);
                setModalVisiable(true);
              }}
            >
              <Icon name="ArrowDown1" />
            </div>
          </Tooltip>
        </div>
      </div>

      {/* Modal */}
      <div
        ref={wrapperRef}
        className={`${
          modalVisiable ? "" : "hidden"
        } fixed top-14 right-6 w-96 bg-white rounded-md shadow-md border p-2`}
      >
        {modalContent}
      </div>
    </>
  );
};

export default Right;
