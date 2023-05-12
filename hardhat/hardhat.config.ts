import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config({path:__dirname+'/.env'})

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: process.env.QUICKNODE_API_KEY_URL,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
    },
  },
};

export default config;
