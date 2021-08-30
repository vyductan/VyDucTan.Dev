import { Table } from "antd";
import { useEffect, useState } from "react";
import MusicPlayer from "../components/English/MusicPlayer";
import { getDailyEnglish, Vocabulary } from "../services/english";

type EnglishProps = {};
const English = ({}: EnglishProps) => {
  const [loading, setLoading] = useState(true);
  const [dailyEnglish, setDailyEnglish] = useState<Vocabulary[]>([]);
  const [datePicked, setDatePicked] = useState<string>();

  const columns = [
    {
      title: "Vocabulary",
      dataIndex: "vocabulary",
      key: "vocabulary",
    },
    {
      title: "POS",
      dataIndex: "pos",
      key: "pos",
    },
    {
      title: "IPA",
      dataIndex: "ipa",
      key: "ipa",
      width: 150,
    },
    {
      title: "Meaning",
      dataIndex: "meaning",
      key: "meaning",
    },
    // {
    //   title: "Example",
    //   dataIndex: "example",
    //   key: "example",
    // },
    // {
    //   title: "Synonym",
    //   dataIndex: "synonym",
    //   key: "synonym",
    // },
    // {
    //   title: "Antonym",
    //   dataIndex: "antonym",
    //   key: "antonym",
    // },
    // {
    //   title: "Topic",
    //   dataIndex: "topic",
    //   key: "topic",
    // },
    // {
    //   title: "Subtopic",
    //   dataIndex: "subtopic",
    //   key: "subtopic",
    // },
    {
      title: "Vietnamese",
      dataIndex: "vietnamese",
      key: "vietnamese",
    },
  ];
  useEffect(() => {
    getDailyEnglish(datePicked).then((v) => {
      setDailyEnglish(v);
      setLoading(false);
    });
  }, [datePicked]);
  return (
    <div>
      <MusicPlayer
        dataSource={dailyEnglish}
        datePicked={datePicked}
        setDatePicked={setDatePicked}
      />

      <Table
        loading={loading}
        columns={columns}
        dataSource={dailyEnglish}
        rowKey="vocabulary"
        style={{ fontSize: 16, whiteSpace: "pre", marginTop: 20 }}
      />
    </div>
  );
};

export default English;
