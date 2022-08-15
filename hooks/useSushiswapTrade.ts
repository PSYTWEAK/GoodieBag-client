import { SushiswapPair, WETH, ChainId, TradeContext } from "simple-sushiswap-sdk";

const sushiswapPair = new SushiswapPair({
  // use the WETH import from the lib, bare in mind you should use the
  // network which yours on, so if your on rinkeby you should use
  // WETH.RINKEBY
  fromTokenContractAddress: WETH.MAINNET().contractAddress,
  // the contract address of the token you want to convert TO
  toTokenContractAddress: "0x111111111117dC0aa78b770fA6A738034120C302",
  // the ethereum address of the user using this part of the dApp
  ethereumAddress: "0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9",
  // you can pass in the provider url as well if you want
  // providerUrl: YOUR_PROVIDER_URL,
  chainId: ChainId.MAINNET,
});

// now to create the factory you just do
const sushiswapPairFactory = await sushiswapPair.createFactory();

// the amount is the proper entered amount
// so if they enter 10 pass in 10 and
// it will work it all out for you
const trade = await sushiswapPairFactory.trade("10");

// subscribe to quote changes
trade.quoteChanged$.subscribe((value: TradeContext) => {
  // value will hold the same info as below but obviously with
  // the new trade info.
});

console.log(trade);
console.log(trade.transaction.data);

// once done with trade aka they have sent it and you don't need it anymore call
trade.destroy();
