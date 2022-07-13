import { ethers } from "hardhat";
import { v4 as uuidv4 } from "uuid";
import { createTradeData, approveToken } from "./utils";
import {
    AUSDC,
    SQUID_SWAP_EXECUTABLE,
    ROUTER,
    WRAPPED_NATIVE_ASSET
} from "./constants/address";

const squidSwapAbi = require("../abi/squidswap.json");
// selected by user/ intergator
const srcChain = "ethereum";
const destChain = "avalanche";
const wETHAmmout = ethers.utils.parseUnits("0.01", 18); // 1 WETH


// values provides via API
async function main() {
    // user wallet
    const signer = (await ethers.getSigners())[0];

    // trade from axlUSDC on soure destination chain
    // user will receive WAVAX (wrapped AVAX) on destChain
    const destAUSDC = AUSDC[destChain]; //aUSDC avalance fuji
    const srcAUSDC = AUSDC[srcChain]; //aUSDC ethereum
    // to from wrapped native asset on srcChain
    const wrappedAvax = WRAPPED_NATIVE_ASSET[destChain]; //avalance fuji
    const wrappedETH = WRAPPED_NATIVE_ASSET[srcChain]; //ropsten
    const crossChainTokenSymbol = "aUSDC" //Axelar native crosss chain token

    // uniswap trade data will be provided via API call in the future
    const srcPath = [wrappedETH, srcAUSDC] // uniswap trade path
    const srcTradeData = createTradeData(
        srcPath,
        ROUTER[srcChain],
        SQUID_SWAP_EXECUTABLE[srcChain],
        wETHAmmout
    );

    // uniswap trade data will be provided via API call in the future
    const destPath = [destAUSDC, wrappedAvax] // uniswap trade path
    const recipientAddress: string = await signer.getAddress();
    const destTradeData = createTradeData(
        destPath,
        ROUTER[destChain],
        recipientAddress,
        0 // slippage parameter not set
    );

    console.log(`User account: ${recipientAddress}`);
    const squidAddress: string = SQUID_SWAP_EXECUTABLE[srcChain as keyof typeof SQUID_SWAP_EXECUTABLE];

    // approve wrappedETH for squidswap on source chain
    const approveTx = await (await approveToken(wrappedETH, signer, squidAddress)).wait();
    console.log(approveTx);

    const AMOUNT_INPUT_POS = 196; // length of tradeData (32) + token in (32) + amount in (32) + router (32) + length of data (32) + 36
    const traceId = ethers.utils.id(uuidv4());
    const squidContract = await ethers.getContractAt(squidSwapAbi, squidAddress, signer);

    const tx = await (await squidContract.tradeSendTrade(
        destChain,
        crossChainTokenSymbol,
        srcTradeData,
        destTradeData,
        traceId,
        recipientAddress,
        AMOUNT_INPUT_POS,
        {
            value: BigInt(5e6),
        }
    )).wait();
    console.log(tx)

};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});