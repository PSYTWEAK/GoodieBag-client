import { BigNumber, ethers } from "ethers";
import { CurrencyAmount, Token, TradeType, Percent } from "@uniswap/sdk-core";
import { AlphaRouter } from "@uniswap/smart-order-router";
import JSBI from "jsbi";
import { weth, arbiTokenEaterAddress } from "../../../globals";


export async function sushi(provider: any, token: any, amountPerTrade: JSBI, slippage: number, callData: any, tokenId: any, value: JSBI) {
  console.log("Trying Sushi");
  // sushiswap contract instance
  const sushiContract = new ethers.Contract(
    "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
    [
      "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
    ],
    provider
  );

  // get the token address
  const tokenAddress = token.id;

  // get the token eater address
  const tokenEaterAddress = arbiTokenEaterAddress;

  // path for swap 
  const path = [tokenAddress, weth, tokenEaterAddress];

  // get the contract quote
  const contractQuote = await sushiContract.getAmountsOut(amountPerTrade, path);

  // get the minimum amount out
  const minimumAmountOut = _minimumAmountOut(contractQuote[2], slippage);

  // get the deadline
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

  const calldata = sushiContract.encodeFunctionData("swapExactETHForTokens", [
    minimumAmountOut,
    path,
    arbiTokenEaterAddress,
    deadline,
  ]);

  if (calldata) {
    callData.push(calldata);
    tokenId.push(token.id);
    value = JSBI.add(amountPerTrade, value);
  }

  return [value, tokenId, callData];
}

function _minimumAmountOut(contractQuote: any, slippage: number) {
  // contractQuote - (contractQuote / (slippage / 100))
  return JSBI.subtract(contractQuote, JSBI.divide(contractQuote, JSBI.divide(JSBI.BigInt(slippage), JSBI.BigInt(100))));
}

