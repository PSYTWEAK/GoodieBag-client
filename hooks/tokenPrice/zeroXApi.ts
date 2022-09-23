// an api call which takes in a token address and gets the token price from the oneInch API and returns it 
import axios from "axios";
import JSBI from "jsbi";
import { weth } from "../../globals";
export let apiBaseUrl: string = "";

const chainUrl = new Map()

chainUrl.set(42161, "https://arbitrum.api.0x.org/swap/v1/")


export async function zeroXApi(provider: any, token: any, amountPerTrade: JSBI) {

    const chainId = provider._network.chainId;


    apiBaseUrl = chainUrl.get(chainId);


    const quoteParams = {
        sellToken: token.id,
        buyToken: weth,
        sellAmount: amountPerTrade,
    };

    const price = await getTokenPrice(quoteParams);

    return price
}

async function getTokenPrice(quoteParams: any) {
    const url = apiRequestUrl("/quote", quoteParams);
    return axios
        .get(url)
        .then((res: any) => {
            console.log(res)
            return res.data.guaranteedPrice;
        })
        .catch((err) => {
            console.log('err', err);
        });
}

function apiRequestUrl(methodName: any, queryParams: any) {
    return apiBaseUrl + methodName + "?" + new URLSearchParams(queryParams).toString();
}


