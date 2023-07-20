import mongoose from "mongoose";
import { LensClient, ProfileFragment, production } from "@lens-protocol/client";
require("dotenv").config();

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

export const getPictureUrl = (profile: ProfileFragment) => {
  const picture = profile.picture;
  return picture
    ? picture.__typename == "MediaSet"
      ? parseUri(picture.original.url)
      : // @ts-ignore
        parseUri(picture.uri)
    : "";
};

export const parseIpfs = (ipfs: string) => {
  const hash = ipfs.split("/")[ipfs.split("/").length - 1];
  return `https://ipfs.io/ipfs/${hash}`;
};

export const parseUri = (uri: string) => {
  if (uri.includes("ipfs")) {
    return parseIpfs(uri);
  }
  if (uri.startsWith("https://")) {
    return uri;
  }
  if (uri.startsWith("ar://")) {
    return "https://arweave.net/" + uri.split("/")[uri.split("/").length - 1];
  }
};
