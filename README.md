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

### Send

![Send Usecase](./docs/images/Send.png "Send USDC")

Send native USDC/axlUSDC (wrapped USDC) token to the destination chain
requires aUSDC token in user wallet.

```shell
npx hardhat run scripts/send.ts
```

### TradeSend

![TradeSend Usecase](./docs/images/TradeSend.png "TradeSend")

Swaps token and send axlUSDC (wrapped USDC) token to the destination chain

```shell
npx hardhat run scripts/tradeSend.ts
```

### SendTrade

![SendTrade Usecase](./docs/images/SendTrade.png "SendTrade")

Sends native axlUSDC (aUSDC on testnet) token and swaps axlUSDC to WAVAX on destination
chain.

```shell
npx hardhat run scripts/sendTrade.ts
```

### SendTradeSend

![SendTradeSend Usecase](./docs/images/SendTradeSend.png "SendTradeSend")

Swaps WETH to aUSDC and bridges assets to destination chain. On destination chains
assets will be swapped again from aUSDC to WAVAX.

```shell
npx hardhat run scripts/sendTradeSend.ts
```