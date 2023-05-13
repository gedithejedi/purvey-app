import { ethers } from "hardhat";
import { Contract } from "ethers";
import { expect } from "chai";

describe("AnonCard", function () {
  let anonCard;

  beforeEach(async function () {
    const AnonCard = await ethers.getContractFactory("AnonCard");
    anonCard = await AnonCard.deploy();
    await anonCard.deployed();
  });

  it("should deploy the contract correctly", async function () {
    expect(await anonCard.owner()).to.equal(await ethers.provider.getSigner().getAddress());
    expect(await anonCard.name()).to.equal("AnonCard");
    expect(await anonCard.symbol()).to.equal("ANONCARD");
  });

  it("should mint a token safely", async function () {
    const to = "0x0000000000000000000000000000000000000001";
    const uri = "ipfs://bafkreiezap7grosb6tl6m7fc3ppve5u2xz7a4tepk7aqc7vewstmvrvzgm";

    await anonCard.safeMint(to, uri);

    const tokenId = 0; // Assuming the first token ID is 0
    expect(await anonCard.ownerOf(tokenId)).to.equal(to);
    expect(await anonCard.tokenURI(tokenId)).to.equal(uri);
  });
});
