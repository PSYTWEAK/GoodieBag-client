import { BigNumber, ethers } from "ethers";
import JSBI from "jsbi";
import { weth, arbiTokenEaterAddress } from "../../../globals";


export async function sushi(provider: any, token: any, amountPerTrade: JSBI, slippage: number, callData: any, tokenId: any, value: JSBI) {
  console.log("Trying Sushi");
  // sushiswap contract instance
  const sushiContract = new ethers.Contract(
    "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    [
      "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
      "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)"
    ],
    provider
  );


  // path for swap 
  const path = [weth, token.id];

  // get the contract quote
  const contractQuote = await sushiContract.getAmountsOut(amountPerTrade.toString(), path);

  // get the minimum amount out
  const minimumAmountOut = _minimumAmountOut(contractQuote[1].toString(), slippage);

  // get the deadline
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

  const calldata = sushiContract.interface.encodeFunctionData("swapExactTokensForTokens", [
    amountPerTrade.toString(),
    minimumAmountOut.toString(),
    path,
    arbiTokenEaterAddress,
    deadline,
  ]);

  if (calldata) {
    callData.push(calldata);
    tokenId.push(token.id);
    value = JSBI.add(amountPerTrade, value);
    console.log("Sushi success", value);
  } else {
    console.log("Sushi failed");
  }

}

function _minimumAmountOut(contractQuote: string, slippage: number) {
  // contractQuote - (contractQuote * (slippage / 100))

  return JSBI.subtract(JSBI.BigInt(contractQuote), JSBI.multiply(JSBI.BigInt(contractQuote), JSBI.divide(JSBI.BigInt(slippage), JSBI.BigInt(100))));
}

