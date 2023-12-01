import { LensClient, ProfileFragment, production } from "@lens-protocol/client";
import urlcat from "urlcat";
import { sanitizeDStorageUrl } from "./sanitizeDStorageUrl";
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
  if (!input.includes("/")) {
    return `lens/${input}`;
  }
  return input;
};

/**
 * Returns the avatar image URL for a given profile.
 *
 * @param profile The profile object.
 * @param namedTransform The named transform to use.
 * @returns The avatar image URL.
 */
export const getAvatar = (profile: any): string => {
  const avatarUrl =
    // Group Avatar fallbacks
    profile?.avatar ??
    // Lens NFT Avatar fallbacks
    profile?.metadata?.picture?.image?.optimized?.uri ??
    profile?.metadata?.picture?.image?.raw?.uri ??
    // Lens Profile Avatar fallbacks
    profile?.metadata?.picture?.optimized?.uri ??
    profile?.metadata?.picture?.raw?.uri ??
    // Stamp.fyi Avatar fallbacks
    getStampFyiURL(
      profile?.ownedBy.address ?? "0x0000000000000000000000000000000000000000"
    );

  return sanitizeDStorageUrl(avatarUrl);
};

/**
 * Returns the cdn.stamp.fyi URL for the specified Ethereum address.
 *
 * @param address The Ethereum address to get the URL for.
 * @returns The cdn.stamp.fyi URL.
 */
const getStampFyiURL = (address: string): string => {
  const lowerCaseAddress = address.toLowerCase();
  return urlcat("https://cdn.stamp.fyi/avatar/eth::address", {
    address: lowerCaseAddress,
    s: 300,
  });
};