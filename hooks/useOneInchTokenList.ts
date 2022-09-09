// this is a hook which querys https://api.1inch.io/v4.0/42161/tokens to get a full list of tokens and stores it in the state
// it also has a function which takes a token address and returns the token logo url


import axios from "axios";
import { useState, useEffect } from "react";

// set oneinch token list to return any type


export default function useOneInchTokenList() {
    const [tokenList, setTokenList] = useState<any>([]);
    const [loading, setLoading] = useState("false");

    useEffect(() => {
        if (tokenList.length === 0) {
            _getTokenList();
        }
        async function _getTokenList() {
            try {
                setLoading("true");
                const _result: any = await getTokenList();
                setTokenList(_result.tokens);
                _result ? setLoading("done") : setLoading("null");
            } catch (error) {
                setLoading("null");
            }
        }
    }, []);

    return [tokenList, loading];
}

async function getTokenList() {
    return axios
        .get("https://api.1inch.io/v4.0/42161/tokens")
        .then((res: any) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}
