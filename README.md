# Squidswap ABI Example Project

This projects demonstrates the interation into squidswap
using the contract ABI. This is ment to be a early access pre-view.
We are currently developing an API to simplifiy trade data generation
as well as an SDK which bundles required contract interactions.

## Setup steps

Copy the `.env.template` as `.env`

Replace private key and infura project ID
```bash
PRIVATE_KEY="insert private key here"
INFURA_PROJECT_ID=""
```

## Fund Test account

Faucets:
[Ethereum Rinkeby](https://faucet.egorfine.com/)
[Avalanche C-Net](https://faucet.avax.network/)
[Moonbase Alpha](https://apps.moonbeam.network/moonbase-alpha/faucet/)

## Running the examples

Default each scripts is executed against [Ropsten network](https://ropsten.etherscan.io/).
So make sure you have ETH and wrapped ETH in your wallet.

### send

Send native axlUSDC (wrapped USDC) token to the destination chain


### tradeSend

Swaps token and send axlUSDC (wrapped USDC) token to the destination chain

```shell
npx hardhat run scripts/tradeSend.ts
```
