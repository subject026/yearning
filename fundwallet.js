/* eslint-disable */
const { ethers } = require("hardhat");

const ABI = require("./src/abi/ERC20.json");

require("dotenv").config();

const MONSTRO_ADDRESS = "0x9235397B559382a9Ea7646280a38e31B12Af4cF6";
const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

const fundAccount = async ({ address, name }) => {
  const signer = await ethers.getImpersonatedSigner(MONSTRO_ADDRESS);

  const WETHcontract = new ethers.Contract(WETH_ADDRESS, ABI, signer);

  await WETHcontract.transfer(address, ethers.utils.parseEther("30.00"), {
    gasLimit: 100000,
    nonce: undefined,
  });

  const WETHbalanceNEW = await WETHcontract.balanceOf(address);
  const parsedWETHbalanceNEW = ethers.utils.formatUnits(WETHbalanceNEW, 18);

  console.log(
    `transfer complete -> ${name} wallet WETH balance: `,
    parsedWETHbalanceNEW
  );

  return;
};

const main = async () => {
  await fundAccount({
    name: "hardhat1",
    address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  });

  process.exit(0);
};

main();
