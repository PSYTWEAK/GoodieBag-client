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

export function sortByVolume(array: any) {
  return array.sort((a: any, b: any) => b.volumeUSD - a.volumeUSD);
}

export function removeDuplicates(tokens: any): any {
  return tokens.filter((value: any, index: number, self: any) => index === self.findIndex((t: any) => t.id === value.id));
}

// look throught tokens array and any tokens that are the same, combine theire volumeUSD then delete the duplicate
export function combineUSDVolumeThenRemoveDuplicates(tokens: any): any {
  let uniqueTokens: any = []; // array to hold the unique tokens

  // loop through tokens array
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]; // get the current token

    // if the token is not in the uniqueTokens array
    if (!uniqueTokens.includes(token.id)) {
      uniqueTokens.push(token); // add the token to the uniqueTokens array
    } else {
      // if the token is in the uniqueTokens array
      let index = uniqueTokens.indexOf(token.id); // get the index of the token in the uniqueTokens array
      uniqueTokens[index].volumeUSD = (parseFloat(uniqueTokens[index].volumeUSD) + parseFloat(token.volumeUSD)).toString(); // add the volumeUSD of the current token to the volumeUSD of the token in the combinedTokens array
    }
  }

  return uniqueTokens;

}


export function removeStables(tokens: any): any {
  let _tokens = tokens;
  for (let i = 0; i < _tokens.length; i++) {
    for (let j = 0; j < stables.length; j++) {
      if (_tokens[i].name === stables[j]) {
        _tokens.splice(i, 1);
      }
    }
  }
  return _tokens;
}


export function removeBlueChips(tokens: any): any {
  let _tokens = tokens;
  for (let i = 0; i < _tokens.length; i++) {
    for (let j = 0; j < blueChips.length; j++) {
      if (_tokens[i].id === blueChips[j]) {
        _tokens.splice(i, 1);
      }
    }
  }
  return _tokens;
}


export function removeLowVolume(tokens: any): any {
  let _tokens = tokens;
  for (let i = 0; i < _tokens.length; i++) {
    if (_tokens[i].volumeUSD < lowVolume) {
      _tokens.splice(i, 1);
    }
  }
  return _tokens;
}

export function removeVolume(tokens: any): any {
  let _tokens = tokens;
  for (let i = 0; i < _tokens.length; i++) {
    if (_tokens[i].volumeUSD > lowVolume) {
      _tokens.splice(i, 1);
    }
  }
  return _tokens;
}

export function removeNoneEthPools(pools: any) {
  return pools.filter((pool: any) => pool.token0.id == weth || pool.token1.id == weth);
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

export function sortTokensByCreatedAt(array: any) {
  return array.sort((a: any, b: any) => {
    return b.createdAtTimestamp - a.createdAtTimestamp;
  });
}