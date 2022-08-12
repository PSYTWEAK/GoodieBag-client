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

export function removeDuplicates(tokens: any): any {
  let _tokens = tokens.filter((value: any, index: number, self: any) => index === self.findIndex((t: any) => t.id === value.id));
  return _tokens;
}

export function removeSignOfDerivInTokenName(tokens: any): any {
  let _tokens = tokens;
  for (let i = 0; i < referencesToDerivative.length; i++) {
    const index = _tokens.findIndex(
      (data: any) =>
        data.symbol.includes(referencesToDerivative[i]) ||
        data.symbol.includes(referencesToDerivative[i]) ||
        data.symbol.includes(referencesToDerivative[i]) ||
        data.symbol.includes(referencesToDerivative[i]) ||
        data.name.includes(referencesToDerivative[i]) ||
        data.name.includes(referencesToDerivative[i]) ||
        data.name.includes(referencesToDerivative[i]) ||
        data.name.includes(referencesToDerivative[i])
    );
    if (index > -1) {
      _tokens.splice(index, 1);
      i--;
    }
  }
  return _tokens;
}

export function removeStables(tokens: any): any {
  let _tokens = tokens;
  for (let i = 0; i < stables.length; i++) {
    const index = _tokens.findIndex((data: any) => data.id === stables[i] || data.id === stables[i]);
    if (index > -1) {
      _tokens.splice(index, 1);
      i--;
    }
  }
  return _tokens;
}

export function removeBlueChips(tokens: any): any {
  let _tokens = tokens;
  for (let i = 0; i < blueChips.length; i++) {
    const index = _tokens.findIndex((data: any) => data.id === blueChips[i] || data.id === blueChips[i]);
    if (index > -1) {
      _tokens.splice(index, 1);
      i--;
    }
  }
  return _tokens;
}

export function removeLowVolume(tokens: any): any {
  let _tokens = tokens;
  const index = _tokens.findIndex((data: any) => data.volumeUSD < lowVolume);
  if (index > -1) {
    _tokens.splice(index, 1);
    return removeLowVolume(_tokens);
  } else {
    return _tokens;
  }
}

export function removeVolume(tokens: any): any {
  let _tokens = tokens;
  const index = _tokens.findIndex((data: any) => data.volumeUSD > lowVolume);
  if (index > -1) {
    _tokens.splice(index, 1);
    return removeVolume(_tokens);
  } else {
    return _tokens;
  }
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
