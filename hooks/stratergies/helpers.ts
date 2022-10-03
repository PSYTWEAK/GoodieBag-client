

export const formatUniswapSubgraphVolume = (volume: any) => {
    (volume / 10 ** 30 * 1.7).toFixed(2)
};