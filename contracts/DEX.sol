// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import '@uniswap/v3-core/contracts/libraries/FullMath.sol';
import '@uniswap/v3-core/contracts/libraries/TickMath.sol';
import "@uniswap/v3-periphery/contracts/libraries/OracleLibrary.sol";

contract DEX {
    address public uniPool;

    constructor(address _uniPool) {
        uniPool = _uniPool;
    }

    function getQuote(uint32 secondsAgo, uint128 amount, bool swap) external view returns (uint256) {
        (int24 tick,) = OracleLibrary.consult(uniPool, secondsAgo);
        uint256 price = 0;
        if (swap) {
            price = OracleLibrary.getQuoteAtTick(tick, amount, 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48, 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599);
        }
        else {
            price = OracleLibrary.getQuoteAtTick(tick, amount, 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599, 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
        }
        return price;
    }
}
