import { clsm } from "@acme/ui";

type Props = {
  hidden: boolean;
  size?: "sm";
};
export const SpeakerMotion = ({ hidden, size }: Props) => {
  const smClassName = size ? "mx-[1px] animate-[move16_0.8s_infinite]" : "sm";
  return (
    <div
      className={clsm(
        "h-full pt-px",
        hidden ? "hidden" : "block",
        "rotate-180",
      )}
    >
      <div className="speaker-playing">
        <div className={clsm("speaker-load", smClassName)} />
        <div className={clsm("speaker-load", smClassName)} />
        <div className={clsm("speaker-load", smClassName)} />
        <div className={clsm("speaker-load", smClassName)} />
      </div>
    </div>
  );
};
