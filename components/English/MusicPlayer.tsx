import Image from "next/image";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import moment from "moment";
import tw, { styled } from "twin.macro";
import { Icon } from "../@vyductan/icons";
import { Vocabulary } from "../../services/english";
import { DatePicker } from "antd";
import { motion } from "framer-motion";

const Button = styled.button({
  ...tw`inline-flex items-center justify-center cursor-pointer rounded-full p-4`,
  "&:focus": {
    ...tw`outline-none`,
  },
  "&:hover": {
    ...tw`text-blue-500`,
    boxShadow: "3px 3px 5px #cccccc, -3px 0px 5px #cccccc",
    transition: "box-shadow 0.4s",
  },
  variants: {
    variant: {
      primary: tw`
        w-20 h-20
      `,
      normal: tw`
        w-14 h-14
      `,
    },
  },
  "& svg": {
    ...tw`h-full`,
  },
});
const Progress = styled.div({
  ...tw`w-[280px] h-3 rounded-md cursor-pointer bg-[#d9d9d9]`,

  div: {
    ...tw`h-full rounded-md bg-gradient-to-r from-[#108ee9] to-[#87d068]`,
  },
});
const formatTime = (s: number) => {
  return Number.isNaN(s)
    ? "0:00"
    : Math.floor(s / 60) + (9 < s ? ":" : ":0") + (s % 60);
};

type MusicPlayerProps = {
  dataSource: Vocabulary[];
  datePicked?: string;
  setDatePicked: Dispatch<SetStateAction<string | undefined>>;
};
const MusicPlayer = ({
  dataSource,
  datePicked,
  setDatePicked,
}: MusicPlayerProps) => {
  const [playState, setPlayState] = useState(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [voiceTime, setVoiceTime] = useState(0);
  const [widthProgess, setWidthProgress] = useState(0);
  const [player] = useState(typeof Audio !== "undefined" && new Audio());

  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleClickProgress = (e: MouseEvent<HTMLDivElement>) => {
    if (!player) return;
    const offset = e.currentTarget.getBoundingClientRect().left;
    const newOffset = e.clientX;
    const newWidth = newOffset - offset;
    setWidthProgress(newWidth);
    const secPerPx = voiceTime / 280;
    player.currentTime = secPerPx * newWidth;
  };

  const handleClickPlay = async () => {
    setPlayState(!playState);
  };

  useEffect(() => {
    if (!player) return;
    if (playState) {
      player.play();
    } else {
      player.pause();
    }
  }, [playState]);

  useEffect(() => {
    if (!player || dataSource.length === 0) return;

    const vocabulary = dataSource[currentId];
    if (!vocabulary) return;

    vocabulary.meaning = vocabulary.meaning.replaceAll("\n", "|");
    player.src =
      "/api/getvoice?text=" + vocabulary.vocabulary + "|" + vocabulary.meaning;
    // + ". " +
    // vocabulary.example;

    if (playState) {
      player.play();
    } else {
      player.pause();
    }

    const interval = setInterval(() => {
      if (!player) return;
      setVoiceTime(Math.ceil(player.duration));
      setCurrentTime(Math.ceil(player.currentTime));
      const secPerPx = Math.ceil(player.duration) / 280;
      const newWidth = Math.ceil(player.currentTime) / secPerPx;
      setWidthProgress(newWidth);

      // End of voice
      if (player.currentTime === player.duration) {
        const nextId = (currentId + 1) % dataSource.length;

        // end of list -> pause
        if (nextId != currentId && currentId != dataSource.length - 1) {
          setCurrentId(nextId);
        } else {
          setPlayState(false);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player, currentId, dataSource]);
  return (
    <div className="w-96 m-auto space-y-4">
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 relative">
          <Image
            alt="header image"
            src="/images/music-player.jpg"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <span className="font-bold">Daily English</span>

        {!datePickerOpen ? (
          <motion.div
            key="date"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1
              className="font-bold text-3xl truncate h-8 cursor-pointer"
              onClick={() => {
                setDatePickerOpen(!datePickerOpen);
              }}
            >
              {datePicked ? datePicked : moment().format("L")}
            </h1>
          </motion.div>
        ) : (
          <motion.div
            key="datePicker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <DatePicker
              className="h-8"
              autoFocus
              open={datePickerOpen}
              onBlur={() => setDatePickerOpen(false)}
              onChange={(v) => {
                setDatePickerOpen(false);
                setDatePicked(v?.format("L"));
              }}
            />
          </motion.div>
        )}
      </div>
      <div className="flex space-x-4 items-center">
        <span>{formatTime(currentTime)}</span>
        <Progress onClick={handleClickProgress}>
          <div style={{ width: isNaN(widthProgess) ? 0 : widthProgess }} />
        </Progress>
        <span>{formatTime(voiceTime)}</span>
      </div>
      <div className="flex space-x-4 justify-evenly items-center">
        <Button variant="normal">
          <Icon
            name="SkipBackward"
            onClick={() => setCurrentId((currentId - 1) % dataSource.length)}
          />
        </Button>
        <Button variant="primary" onClick={handleClickPlay}>
          <Icon name={playState ? "Pause" : "Play"} />
        </Button>
        <Button variant="normal">
          <Icon
            name="SkipForward"
            onClick={() => setCurrentId((currentId + 1) % dataSource.length)}
          />
        </Button>
      </div>
      <div className="flex space-x-4 justify-evenly">
        <Button variant="normal">
          <Icon name="Shuffle" />
        </Button>
        <Button variant="normal">
          <Icon name="HeartOutline" />
        </Button>
        <Button variant="normal">
          <Icon name="ArrowRepeat" />
        </Button>
      </div>
    </div>
  );
};
export default MusicPlayer;
