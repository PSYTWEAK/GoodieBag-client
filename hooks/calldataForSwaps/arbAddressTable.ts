import { BigNumber, ethers } from "ethers";
import { arbiAddressTable } from "../../globals";

// this is a gas optimisation for Arbitrum. 
// looking up the address index in the Arbitrum address table is cheaper than putting the entire address in data in the transaction
export function getAddressIndex(address: string, provider: any) {
    const arbAddressTableContract = new ethers.Contract(
        arbiAddressTable,
        [
            "function lookup(address account) public view returns (uint index)"
        ],
        provider
    );


    return arbAddressTableContract.lookup(address);

}