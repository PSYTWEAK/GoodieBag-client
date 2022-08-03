import { createClient } from "urql";
import { useEffect, useState } from "react";
import useOrderedByVolume from "../subgraphQuerys/useOrderedByVolume";

export default async function useRandomlySelected() {
  const result = await useOrderedByVolume();

  let pools: any = result.data.poolDayDatas;
  console.log(pools);

  pools = removeBlueChips(pools);
  pools = removeStables(pools);
  // pools = removeLowVolume(pools);
  pools = removeNoneEthPools(pools);
  pools = removeStableInTokenName(pools);
  pools = format(pools);
  pools = shuffle(pools);
  pools = pools.slice(0, 50);

  console.log(pools);

  return pools;
}

const blueChips = [
  //wbtc
  "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
];
const stables = [
  //usdc
  "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
  //dai
  "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
  //usdt
  "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
  //frax
  "0x17fc002b466eec40dae837fc4be5c67993ddbd6f",
  //mim
  "0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a",
];
const weth = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1";

const stablecoinNames = ["USD", "EUR", "JPY"];

const lowVolume = "100";

function shuffle(array: any) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function removeNoneEthPools(pools: any): any {
  let _pools = pools;
  const index = _pools.findIndex((data: any) => data.pool.token0.id != weth && data.pool.token1.id != weth);
  if (index > -1) {
    _pools.splice(index, 1);
    return removeNoneEthPools(_pools);
  } else {
    return _pools;
  }
}

function removeStables(pools: any): any {
  let _pools = pools;
  for (let i = 0; i < stables.length; i++) {
    const index = _pools.findIndex((data: any) => data.pool.token0.id === stables[i] || data.pool.token1.id === stables[i]);
    if (index > -1) {
      _pools.splice(index, 1);
      i--;
    }
  }
  return _pools;
}

function removeStableInTokenName(pools: any): any {
  let _pools = pools;
  for (let i = 0; i < stablecoinNames.length; i++) {
    const index = _pools.findIndex((data: any) => data.pool.token0.name.includes(stablecoinNames[i]) || data.pool.token1.name.includes(stablecoinNames[i]));
    if (index > -1) {
      _pools.splice(index, 1);
      i--;
    }
  }
}

function removeBlueChips(pools: any): any {
  let _pools = pools;
  for (let i = 0; i < blueChips.length; i++) {
    const index = _pools.findIndex((data: any) => data.pool.token0.id === blueChips[i] || data.pool.token1.id === blueChips[i]);
    if (index > -1) {
      _pools.splice(index, 1);
      i--;
    }
  }
  return _pools;
}

function removeLowVolume(pools: any): any {
  let _pools = pools;
  const index = _pools.findIndex((data: any) => data.pool.volumeUSD < lowVolume);
  if (index > -1) {
    _pools.splice(index, 1);
    return removeLowVolume(_pools);
  } else {
    return _pools;
  }
}

function format(pools: any): any {
  let _pools = Object.assign([], pools);
  for (let i = 0; i < pools.length; i++) {
    if (pools[i].pool.token0.id != weth) {
      _pools[i].pool.token1.id = pools[i].pool.token0.id;
      _pools[i].pool.token1.name = pools[i].pool.token0.name;
      _pools[i].pool.token1.symbol = pools[i].pool.token0.symbol;
      _pools[i].pool.token0.id = weth;
      _pools[i].pool.token0.name = "";
      _pools[i].pool.token0.symbol = "";
    }
  }
  return _pools;
}
