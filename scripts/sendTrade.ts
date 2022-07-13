import { ethers } from "hardhat";
import { v4 as uuidv4 } from "uuid";
import { createTradeData, approveToken } from "./utils";
import { AUSDC, 
         SQUID_SWAP_EXECUTABLE,
         ROUTER,
         WRAPPED_NATIVE_ASSET } from "./constants/address";

const squidSwapAbi = require("../abi/squidswap.json");
// selected by user/ intergator
const srcChain = "ethereum";
const destChain = "avalanche";
const aUSDCAmmout = ethers.utils.parseUnits("0.1", 6); // 0.1 aUSDC



// values provides via API
async function main() {
  // user wallet
  const signer = (await ethers.getSigners())[0];

   
  
  // trade from axlUSDC on soure destination chain
  // user will receive WAVAX (wrapped AVAX) on destChain
  const aUSDC = AUSDC[destChain]; //aUSDC avalance fuji
  const srcAUSDC = AUSDC[srcChain]; //aUSDC ethereum
  // to from wrapped native asset on srcChain
  const wrappedAvax = WRAPPED_NATIVE_ASSET[destChain]; //avalance fuji
  const crossChainTokenSymbol = "aUSDC" //Axelar native crosss chain token

  // uniswap trade data will be provided via API call in the future
  const path = [ aUSDC, wrappedAvax] // uniswap trade path
  const recipientAddress:string = await signer.getAddress();
  const destTradeData = createTradeData(
        path,
        ROUTER[destChain],
        recipientAddress,
        0 // slippage parameter not set
      );

  
  console.log(`User account: ${recipientAddress}`);
  const squidAddress:string = SQUID_SWAP_EXECUTABLE[srcChain as keyof typeof SQUID_SWAP_EXECUTABLE];
  // approve aUSDC for squidswap
  const approveTx = await (await approveToken(srcAUSDC, signer, squidAddress)).wait();
  console.log(approveTx);
  
  const AMOUNT_INPUT_POS = 196; // length of tradeData (32) + token in (32) + amount in (32) + router (32) + length of data (32) + 36
  const traceId = ethers.utils.id(uuidv4());
  const squidContract = await ethers.getContractAt(squidSwapAbi, squidAddress, signer);
  const tx = await (await squidContract.sendTrade(
    destChain,
    crossChainTokenSymbol,
    aUSDCAmmout,
    destTradeData,
    traceId,
    recipientAddress,
    AMOUNT_INPUT_POS,
    {
      value: BigInt(5e6),
    }
  )).wait()
  console.log(tx)
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
