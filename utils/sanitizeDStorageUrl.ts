/**
 * Returns the IPFS link for a given hash.
 *
 * @param hash The IPFS hash.
 * @returns The IPFS link.
 */
export const sanitizeDStorageUrl = (hash?: string): string => {
  const ipfsGateway = "https://cf-ipfs.com/ipfs/";
  const arweaveGateway = "https://arweave.net/";

  if (!hash) {
    return "";
  }

  let link = hash.replace(/^Qm[1-9A-Za-z]{44}/gm, `${ipfsGateway}${hash}`);
  link = link.replace("https://ipfs.io/ipfs/", ipfsGateway);
  link = link.replace("ipfs://ipfs/", ipfsGateway);
  link = link.replace("ipfs://", ipfsGateway);
  link = link.replace("ar://", arweaveGateway);

  return link;
};
