import { ethers } from "hardhat";
import { ethers as tsEthers } from "ethers"
import { BigNumberish } from "@ethersproject/bignumber"

// UniswapV2 ABI
const routerAbi = require("../abi/router.json");
const erc20Abi = require("../abi/erc20.json");

export async function approveToken(
    erc20address: string,
    sender: tsEthers.Signer,
    spender: string
) {
    const contract = new tsEthers.Contract(erc20address, erc20Abi, sender);
    const tx = await contract.approve(spender, tsEthers.constants.MaxUint256);
    return tx;
}

function getSwapRouterAbi() {
    return routerAbi;
}

function getSwapFunctionName() {
    return "swapExactTokensForTokens";
}

export function createSwapPayload(
    swapPath: string[],
    recipientAddress: string,
    amount: BigNumberish
) {
    const swapRouterAbi = getSwapRouterAbi();
    const swapFunctionName = getSwapFunctionName();

    const iface = new tsEthers.utils.Interface(swapRouterAbi);
    const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 20;
    const swapPayload = iface.encodeFunctionData(swapFunctionName, [
        ethers.BigNumber.from(amount),
        0,
        swapPath,
        recipientAddress,
        deadline,
    ]);

    return swapPayload;
}

export function createTradeData(
    swapPath: string[],
    routerAddress: string,
    recipientAddress: string,
    amount: BigNumberish
) {
    const swapPayload = createSwapPayload(swapPath, recipientAddress, amount);
    return ethers.utils.defaultAbiCoder.encode(
        ["address", "uint256", "address", "bytes"],
        [swapPath[0], amount, routerAddress, swapPayload]
    );
}