import { Form, Modal, Table } from "antd";
import firebase from "firebase";
import { useEffect, useState } from "react";
import FormItem from "../components/@vyductan/components/FormItem";
import TextArea from "../components/@vyductan/components/TextArea";
import MusicPlayer from "../components/English/MusicPlayer";
import {
  addParagraph,
  getDailyEnglish,
  ParagraphItem,
  Vocabulary,
} from "../services/english";

type EnglishProps = {};
const English = ({}: EnglishProps) => {
  const [loading, setLoading] = useState(true);
  const [dailyEnglish, setDailyEnglish] = useState<Vocabulary[]>([]);
  const [datePicked, setDatePicked] = useState<string>();

  const onFinish = async (values: ParagraphItem) => {
    values.created_at = firebase.firestore.Timestamp.fromDate(new Date());

    // console.log(values);
    await addParagraph(values);
  };

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

      <Modal>
        <Form onFinish={onFinish}>
          <FormItem label="Paragraph" name="paragraph">
            <TextArea />
          </FormItem>
          <button type="submit">Save</button>
        </Form>
      </Modal>
    </div>
  );
};

export default English;
