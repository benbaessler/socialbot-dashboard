import mongoose from "mongoose";
import { LensClient, production } from "@lens-protocol/client";
require("dotenv").config();

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("Connected to DB");
};

export const lensClient = new LensClient({
  environment: production,
});

export const numberToHex = (num: number) => {
  let hexValue = num.toString(16);

  if (hexValue.length % 2 !== 0) {
    hexValue = "0" + hexValue;
  }

  return `0x${hexValue}`;
};

export const hexToNumber = (hex: string) => parseInt(hex, 16).toString();


export const parseHandle = (input: string): string => {
  if (!input.endsWith(".lens") && input != "lensprotocol") {
    return input + ".lens";
  }
  return input;
};
