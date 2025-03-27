const { ethers } = require("hardhat");

async function main() {
    const dexAddress = "0x2aa8Fb5b1D039acEEde9412b2960CeaCdE114206";
    const ethAddress = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
    const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

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

    const dex = new ethers.Contract(dexAddress, dexAbi, ethers.provider);

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

        const amountOut2 = await dex.getFunction("getQuoteUni").staticCall(
            1,
            amountIn,
            true
        );
        console.log("Quote output for 1 WETH → USDC in 1 second:", ethers.formatUnits(amountOut2, 6), "USDC");
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