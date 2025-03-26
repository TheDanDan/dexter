# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

```
npx hardhat run scripts/deploy.js --network buildbear
```

```
let dex = await ethers.getContractAt("DEX","0x410A0A1eF5F014c276D77e45f255Ba652d4A1520");
```
```
await dex.getQuote(1, 10000000, false);
```