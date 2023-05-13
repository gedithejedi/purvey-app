require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require('@nomiclabs/hardhat-ethers');

const { PRIVATE_KEY, API_URL } = process.env;

module.exports = {
  solidity: "0.8.17",
  networks: {
    linea: {
      url: `https://rpc.goerli.linea.build/`,
      accounts: [PRIVATE_KEY],
    },
    ropsten: { 
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};