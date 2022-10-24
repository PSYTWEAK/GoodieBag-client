// globals
// weth 
export const weth = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1";
// strats
export const statergys = [/* "Custom",  */"24 hour highest volume 💪", "Recently added to a DEX 👶", "Randomly selected 🎲", "Minimum $100 24 hour volume 🎲", "Maximum $0 24 hour volume 🤪🎲", "The Arbitrum Odyssey 🧑‍🚀"];
export const statergyDescriptions = new Map()

statergyDescriptions.set("24 hour highest volume 💪", "List of tokens ordered from highest to lowest 24 hour volume")
statergyDescriptions.set("Recently added to a DEX 👶", "List of tokens in order of most recently added to a DEX")
statergyDescriptions.set("Randomly selected 🎲", "List of all tokens found in daily data, in a random order")
statergyDescriptions.set("Minimum $100 24 hour volume 🎲", "List of tokens randomly selected with a minimum 24 hour volume of $100")
statergyDescriptions.set("Maximum $0 24 hour volume 🤪🎲", "List of tokens randomly selected with $0 in 24 hour volume")
statergyDescriptions.set("The Arbitrum Odyssey 🧑‍🚀", "List of tokens associated with the Arbitrum Odyssey projects")
// subgraphs
export const UNISWAP_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/benjaminlu/arbitrum-one-uniswap-v3";
export const SUSHISWAP_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/sushiswap/sushiswap-arbitrum";
export const LEADERBOARD_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/psytweak/goodiebag-leaderboard";
// goodiebag contract
export const arbiGoodieBagAddress = "0x176Dca0287F75759E55b08E07a2AAD5aCBcd3E1A";
// uniswap contracts
export const arbiUniswapQuoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
export const arbiUniswapRouterAddress = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
// sushi contracts
export const arbiSushiswapRouterAddress = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
// inch contracts
export const oneInchAddress = "0x1111111254fb6c44bac0bed2854e76f90643097d";
export const zeroXAddress = "0xdef1c0ded9bec7f1a1670819833240f027b25eff";
// arbitrum address table
export const arbiAddressTable = "0x0000000000000000000000000000000000000066";

// global settings
export const globalSettings = {
    maximumTokens: 60,
}

export const arbiVaultAddress = "0x0253A7C16Af792Dd5E8Df6f41902D09E608799E7"

export const socialContract = "0x63324d0b06fe2Ff0055FE9F0ba20fA6Ed0f97660"