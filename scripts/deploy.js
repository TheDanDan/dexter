const hre = require("hardhat");
require('dotenv').config();

const SEPOLIA_UNISWAP = "0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3";
const UNISWAP_POOL = "0x3289680dD4d6C10bb19b899729cda5eEF58AEfF1";
const CURVE_POOL = "0x7F86Bf177Dd4F3494b841a37e810A34dD56c829B";

async function main() {
    const DEX = await hre.ethers.getContractFactory("DEX");
    const dex = await DEX.deploy(UNISWAP_POOL, SEPOLIA_UNISWAP); 
    console.log("DEX deployed to:", dex.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });