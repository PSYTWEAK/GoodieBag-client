import JSBI from "jsbi";
import { BigNumber, ethers } from "ethers";
import { zeroXApi } from "./zeroXApi";
import { useEffect, useState } from "react";

async function getPrice(provider: any, token: any, setTokenPrice: any) {

  let price: any = false;

  const amountPerTrade = JSBI.BigInt(100000000000000000);

  price = await zeroXApi(provider, token, amountPerTrade);

  if (price) {
    setTokenPrice(price);
  } else {
    setTokenPrice("unknown");
  }
}

export default function useTokenPrice() {
  const [tokenPrice, setTokenPrice] = useState("0")


  async function getTokenPrice(provider: any, token: any) {

    return getPrice(provider, token, setTokenPrice);
  }


  return { tokenPrice, getTokenPrice };
}
