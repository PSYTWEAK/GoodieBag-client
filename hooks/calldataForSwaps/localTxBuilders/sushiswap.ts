import { BigNumber, ethers } from "ethers";
import JSBI from "jsbi";
import { weth, arbiGoodieBagAddress, arbiSushiswapRouterAddress } from "../../../globals";


export async function sushi(provider: any, token: any, amountPerTrade: JSBI, slippage: number, setTxObject: any) {
  // sushiswap contract instance
  const sushiContract = new ethers.Contract(
    arbiSushiswapRouterAddress,
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
  const deadline = Math.floor(1000000000000) + 60 * 20;

  const calldata = await sushiContract.interface.encodeFunctionData("swapExactTokensForTokens", [
    amountPerTrade.toString(),
    minimumAmountOut.toString(),
    path,
    arbiGoodieBagAddress,
    deadline,
  ]);

  if (calldata) {
    setTxObject((prevState: any) => ({
      router: [...prevState.router, arbiSushiswapRouterAddress],
      callData: [...prevState.callData, calldata],
      tokenId: [...prevState.tokenId, token.id],
      value: JSBI.add(amountPerTrade, prevState.value),
    }));
    return true;
  } else {
    return false;
  }
}

function _minimumAmountOut(contractQuote: string, slippage: number) {
  // contractQuote - (contractQuote * (slippage / 100))
  return JSBI.subtract(JSBI.BigInt(contractQuote), JSBI.multiply(JSBI.BigInt(contractQuote), JSBI.divide(JSBI.BigInt(slippage), JSBI.BigInt(100))));
}

