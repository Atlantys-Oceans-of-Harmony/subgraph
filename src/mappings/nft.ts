import { Transfer } from "../../generated/TestNFT/TestNFT";

import { NFT } from "../../generated/schema";

export function handleTransfer_NFTs(event: Transfer): void {
  let id = event.address.toHexString() + "-" + event.params.tokenId.toString();
  let token = NFT.load(id);
  if (token == null) {
    token = new NFT(id);
    token.type = 0;
  }
  token.tokenId = event.params.tokenId.toString();
  let newOwner = event.params.to.toHexString();
  if (newOwner != "0x2dfb6d18a247dee62bf91857afb25098f689bf4d") {
    token.owner = event.params.to.toHexString();
    token.type = 0;
  }
  token.contract = event.address.toHexString();
  token.save();
}

// NFT TOKEN
// - owner
// - id
// - type : 0 - Not listed, 1 - Direct, 2 - Auction
// - price
// - bidder
// - last bid
