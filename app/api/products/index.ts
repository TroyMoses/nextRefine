import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Product from "../../../models/Product";
import clientPromise from "../../../lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await clientPromise;
  mongoose.connect(process.env.MONGODB_URI!);

  if (req.method === "GET") {
    const products = await Product.find({});
    res.status(200).json(products);
  } else if (req.method === "POST") {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
