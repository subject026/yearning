/* eslint-disable */
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
        blockNumber: 18135113,
      },
      mining: {
        auto: true,
        interval: 2000,
      },
    },
  },
  solidity: "0.8.19",
};
