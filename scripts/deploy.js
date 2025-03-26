const hre = require("hardhat");
require('dotenv').config();

async function main() {
    const DEX = await hre.ethers.getContractFactory("DEX");
    const dex = await DEX.deploy("0x99ac8cA7087fA4A2A1FB6357269965A2014ABc35"); 
    console.log("DEX deployed to:", dex.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });