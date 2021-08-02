// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Res = {
  success: boolean;
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  res.status(200).json({ success: true, name: "John Doe" });
}
