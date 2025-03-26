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
let dex = await ethers.getContractAt("DEX","0x410A0A1eF5F014c276D77e45f255Ba652d4A1520");
```

Get quote for WBTC -> USDC
```
await dex.getQuote(1, 10000000, false);
```

Get quote for USDC -> WBTC
```
await dex.getQuote(1, 10000000, true);
```