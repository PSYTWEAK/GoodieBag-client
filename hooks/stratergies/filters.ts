import { blueChips, lowVolume, weth, stables, referencesToDerivative } from "./globals";

export function shuffleTokens(array: any) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function removeNoneEthPools(pools: any): any {
  let _pools = pools;
  const index = _pools.findIndex((data: any) => data.pool.token0.id != weth && data.pool.token1.id != weth);
  if (index > -1) {
    _pools.splice(index, 1);
    return removeNoneEthPools(_pools);
  } else {
    return _pools;
  }
}

export function removeDuplicates(pools: any): any {
  let _pools = pools.filter((value: any, index: number, self: any) => index === self.findIndex((t: any) => t.pool.token1.id === value.pool.token1.id));
  return _pools;
}

export function removeSignOfDerivInTokenName(pools: any): any {
  let _pools = pools;
  for (let i = 0; i < referencesToDerivative.length; i++) {
    const index = _pools.findIndex(
      (data: any) =>
        data.pool.token0.symbol.includes(referencesToDerivative[i]) ||
        data.pool.token0.symbol.includes(referencesToDerivative[i]) ||
        data.pool.token1.symbol.includes(referencesToDerivative[i]) ||
        data.pool.token1.symbol.includes(referencesToDerivative[i]) ||
        data.pool.token0.name.includes(referencesToDerivative[i]) ||
        data.pool.token0.name.includes(referencesToDerivative[i]) ||
        data.pool.token1.name.includes(referencesToDerivative[i]) ||
        data.pool.token1.name.includes(referencesToDerivative[i])
    );
    if (index > -1) {
      _pools.splice(index, 1);
      i--;
    }
  }
  return _pools;
}

export function removeStables(pools: any): any {
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

export function removeBlueChips(pools: any): any {
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

export function removeLowVolume(pools: any): any {
  let _pools = pools;
  const index = _pools.findIndex((data: any) => data.pool.volumeUSD < lowVolume);
  if (index > -1) {
    _pools.splice(index, 1);
    return removeLowVolume(_pools);
  } else {
    return _pools;
  }
}

export function removeVolume(pools: any): any {
  let _pools = pools;
  const index = _pools.findIndex((data: any) => data.pool.volumeUSD > "100");
  if (index > -1) {
    _pools.splice(index, 1);
    return removeLowVolume(_pools);
  } else {
    return _pools;
  }
}
