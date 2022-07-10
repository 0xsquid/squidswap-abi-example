import { ethers } from "hardhat";
import { createTradeData, approveToken } from "./utils";
import { AUSDC,
         GATEWAY } from "./constants/address";

const axelarGatewayAbi = require("../abi/axelarGateway.json");
// selected by user/ intergator
const srcChain = "ethereum";
const destChain = "avalanche";
const aUSDCAmmout = ethers.utils.parseUnits("0.1", 6); // 0.1 aUSDC


// values provides via API
async function main() {
  // user wallet
  const signer = (await ethers.getSigners())[0];

  // send axlUSDC on soure chain (required for squid transfer)
  // user will receive aUSDC (axelar USDC) on destChain
  const aUSDC = AUSDC[srcChain]; //aUSDC ropsten
  const gatewayAddress = GATEWAY[srcChain]; //Axelar cross chain gateway

  const recipientAddress:String = await signer.getAddress();
  console.log(recipientAddress);
  const approveTx = await (await approveToken(aUSDC, signer, gatewayAddress)).wait();
  console.log(approveTx);
  
  const gatewayContract = await ethers.getContractAt(axelarGatewayAbi, gatewayAddress, signer);
  const tx = await (await gatewayContract.sendToken(
    destChain,
    recipientAddress,
    "aUSDC",
    aUSDCAmmout
  )).wait()
  console.log(tx)
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
