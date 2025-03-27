# Sample DEX Project
Currently hardcoded for the USDC/WBTC

Will require the .env file to be populated
```
PRIVATE_KEY=
NETWORK_URL=https://rpc.buildbear.io/active-jubilee-2923109c
PUBLIC_KEY=
```

Deploy the contract
```
npx hardhat run scripts/deploy.js --network buildbear
```
Open the buildbear console
```
npx hardhat console --network buildbear
```

In the console:
```
let dex = await ethers.getContractAt("DEX","0x32B4A0383a1b7456068b6adB14253fdC78098Ab4");
```

Get quote for WBTC -> USDC
```
await dex.getQuote(1, 10000000, false);
```

Get quote for USDC -> WBTC
```
await dex.getQuote(1, 10000000, true);
```

Testing
```
await dex.getQuoteWETH(10000, "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14", "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", 3000);
```