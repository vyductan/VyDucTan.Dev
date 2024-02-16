// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import * as googleTTS from "google-tts-api";

type Res = {
  success: boolean;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  // const text = `So, the way to fix this problem is to check whether all the data gets flushed when we send it to the write stream. If this data is being buffered, then we need to pause the read stream. As soon as the buffers are emptied and the write stream gets drained, we can safely resume the data fetching process from the read stream.`;

  let { text } = req.query;

  if (!text) {
    return res.status(400).end();
  }
  if (typeof text != "string") {
    text = text.join(".");
  }

  const arrText = text.split("|");
  const audios: { shortText: string; base64: string }[] = [];
  const r = await Promise.all(
    arrText.map((x) => {
      if (x === "") return;
      return googleTTS.getAllAudioBase64(x, {
        lang: "en",
        slow: false,
        host: "https://translate.google.com",
      });
    })
  );
  r.map((x) => {
    if (x) audios.push(...x);
  });

  const readable = new Readable();
  readable._read = () => {};
  audios.map((x) => {
    const buffer = Buffer.from(x.base64, "base64");
    readable.push(buffer);
  });
  readable.push(null); // requestment
  readable.readableLength;
  res.writeHead(200, {
    "accept-ranges": "bytes",
    "Content-Type": "audio/mp3",
    "Content-Length": readable.readableLength,
    "Content-Range":
      "bytes 0-" + readable.readableLength + "/" + readable.readableLength,
  });
  readable.pipe(res);
}
