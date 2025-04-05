const { ethers } = require("hardhat");

async function main() {
    const quoteAddress = "0xF051C1Da4798290bb258331dEF69629D29743f0F";
    const ethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

    const dexAbi = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_uniPool",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_quoter",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "tokenIn",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "tokenOut",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amountOut",
                    "type": "uint256"
                }
            ],
            "name": "Quote",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "secondsAgo",
                    "type": "uint32"
                },
                {
                    "internalType": "uint128",
                    "name": "amount",
                    "type": "uint128"
                },
                {
                    "internalType": "bool",
                    "name": "swap",
                    "type": "bool"
                }
            ],
            "name": "getQuoteUni",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "tokenIn",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tokenOut",
                    "type": "address"
                },
                {
                    "internalType": "uint24",
                    "name": "fee",
                    "type": "uint24"
                }
            ],
            "name": "getQuoteWETH",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "quoter",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "uniPool",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const dex = new ethers.Contract(quoteAddress, dexAbi, ethers.provider);

    const fee = 3000; // 0.3% pool
    const amountIn = ethers.parseUnits("1", 18); // 1 WETH

    try {
        const amountOut = await dex.getFunction("getQuoteWETH").staticCall(
            amountIn,
            ethAddress,
            usdcAddress,
            fee
        );
        console.log("Quote output for 1 WETH → USDC:", ethers.formatUnits(amountOut, 6), "USDC");
    } catch (error) {
        console.error("Error fetching quote:", error);
    }
}

// Run the script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });