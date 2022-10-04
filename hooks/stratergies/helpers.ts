

export const formatUniswapSubgraphVolume = (volume: any) => {
    return (volume / 10 ** 30 * 1.7).toFixed(2)
};