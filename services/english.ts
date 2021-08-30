import axios from "axios";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
import firebase from "firebase";
import { selectCollection } from "./firebase";

const db = selectCollection("english");

const API_KEY = "AIzaSyBXwLFPCc1y24upUslWUkF_sQSuoy0aw6U";
const SHEET_ID = "1sI37NLM_670eUcirywS9g0Kupw2d-2Cgw9NIYbsm3Ao";
const SHEET_URL =
  "https://sheets.googleapis.com/v4/spreadsheets/" +
  SHEET_ID +
  "?key=" +
  API_KEY;

const VALUES_GET_URL =
  "https://sheets.googleapis.com/v4/spreadsheets/" +
  SHEET_ID +
  "/values/Daily" +
  "?majorDimension=ROWS&key=" +
  API_KEY;
export type ParagraphItem = {
  paragraph: string;
  created_at: firebase.firestore.Timestamp;
};
export async function addParagraph(newData: ParagraphItem) {
  try {
    await db.add(newData);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export type Vocabulary = {
  vocabulary: string;
  pos: string;
  ipa: string;
  meaning: string;
  example: string;
  synonym: string;
  antonym: string;
  topic: string;
  subtopic: string;
  vietnamese: string;
};
export async function getRanges() {
  try {
    const res = await axios.get(SHEET_URL);
    return res.data.sheets.map((x: any) => x.title);
  } catch (error) {
    console.log(error);
  }
}

export async function getDailyEnglish(
  datePicked = moment().format("L")
): Promise<Vocabulary[]> {
  try {
    const res = await axios.get(VALUES_GET_URL);
    const dailyRows = res.data.values.reduce((memo: any, item: any) => {
      if (item[0] === datePicked) {
        // if (item[0] === "27/08/2021") {
        const newItem: Vocabulary = {
          vocabulary: item[1],
          pos: item[2],
          ipa: item[3],
          meaning: item[4],
          example: item[5],
          synonym: item[6],
          antonym: item[7],
          topic: item[8],
          subtopic: item[9],
          vietnamese: item[10],
        };
        memo.push(newItem);
      }
      return memo;
    }, []);

    return dailyRows;
  } catch (error) {
    console.log(error);
    return [];
  }
}
