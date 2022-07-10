import { ethers } from "hardhat";
import { createTradeData, approveToken } from "./utils";
import { AUSDC,
         ROUTER, 
         SQUID_SWAP_EXECUTABLE,
         WRAPPED_NATIVE_ASSET } from "./constants/address";

const squidSwapAbi = require("../abi/squidswap.json");
// selected by user/ intergator
const srcChain = "ethereum";
const destChain = "avalanche";
const wETHAmmout = ethers.utils.parseUnits("0.01", 18); // 1 WETH



// values provides via API
async function main() {
  // user wallet
  const signer = (await ethers.getSigners())[0];

  // trade from wrapped native asset on srcChain
  const wrappedETH = WRAPPED_NATIVE_ASSET[srcChain]; //Ropsten
  // to axlUSDC on soure chain (required for squid transfer)
  // user will receive aUSDC (axelar USDC) on destChain
  const aUSDC = AUSDC[srcChain]; //aUSDC ropsten

  // uniswap trade data will be provided via API call in the future
  const path = [ wrappedETH, aUSDC ] // uniswap trade path
  const srcTradeData = createTradeData(
        path,
        ROUTER[srcChain],
        SQUID_SWAP_EXECUTABLE[srcChain],
        wETHAmmout
      );

  const recipientAddress:String = await signer.getAddress();
  console.log(recipientAddress);
  const squidAddress:string = SQUID_SWAP_EXECUTABLE[srcChain as keyof typeof SQUID_SWAP_EXECUTABLE];
  const approveTx = await (await approveToken(wrappedETH,signer, squidAddress)).wait();
  console.log(approveTx);
  
  const squidContract = await ethers.getContractAt(squidSwapAbi, squidAddress, signer);
  const tx = await (await squidContract.tradeSend(
    destChain,
    recipientAddress,
    "aUSDC",
    srcTradeData
  )).wait()
  console.log(tx)
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
