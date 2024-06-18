import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Product from "../../../models/Product";
import clientPromise from "../../../lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await clientPromise;
  mongoose.connect(process.env.MONGODB_URI!);

  const { id } = req.query;

  if (req.method === "GET") {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } else if (req.method === "PUT") {
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(product);
  } else if (req.method === "DELETE") {
    await Product.findByIdAndDelete(id);
    res.status(204).end();
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
