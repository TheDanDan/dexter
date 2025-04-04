# Sample DEX Project
Currently hardcoded for the USDC/WBTC

Will require the .env file to be populated
```
PRIVATE_KEY=
NETWORK_URL=YOUR_BUILDBEAR_NETWORK
PUBLIC_KEY=
```

Deploy the contract
```
npx hardhat run scripts/deploy.js --network buildbear
```

In scripts/quote.js set to the address from the deploy
```
const dexAddress = "0x2aa8Fb5b1D039acEEde9412b2960CeaCdE114206";
```

Get a quote
```
npx hardhat run scripts/quote.js --network buildbear
```
