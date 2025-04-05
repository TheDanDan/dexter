const hre = require("hardhat");
require('dotenv').config();

const MAINNET_UNISWAP_QUOTER = "0x61fFE014bA17989E743c5F6cB21bF9697530B21e";

async function main() {
    const DEX = await hre.ethers.getContractFactory("DEX");
    const dex = await DEX.deploy(MAINNET_UNISWAP_QUOTER); 
    console.log("DEX deployed to:", dex.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });