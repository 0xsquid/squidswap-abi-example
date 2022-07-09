import { Chain } from "./chains";

// Testnet gateway
export const GATEWAY = {
  [Chain.ETHEREUM]: "0xBC6fcce7c5487d43830a219CA6E7B83238B41e71",
  [Chain.MOONBEAM]: "0x5769D84DD62a6fD969856c75c7D321b84d455929",
  [Chain.AVALANCHE]: "0xC249632c2D40b9001FE907806902f63038B737Ab",
};

export const GAS_RECEIVER = {
  [Chain.ETHEREUM]: "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6",
  [Chain.MOONBEAM]: "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6",
  [Chain.AVALANCHE]: "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6",
};

export const WRAPPED_NATIVE_ASSET = {
  [Chain.ETHEREUM]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
  [Chain.MOONBEAM]: "0x1436aE0dF0A8663F18c0Ec51d7e2E46591730715",
  [Chain.AVALANCHE]: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
};

export const SQUID_SWAP_EXECUTABLE = {
  [Chain.AVALANCHE]: "0x84500e012FCD0a89a6C8f463Dd334E305f76f52B",
  [Chain.MOONBEAM]: "0x84500e012FCD0a89a6C8f463Dd334E305f76f52B",
  [Chain.ETHEREUM]: "0xdAA3Cab203c974F0B071C363258B3fEF45f9cC6f",
};

export const ROUTER = {
  [Chain.AVALANCHE]: "0x2D99ABD9008Dc933ff5c0CD271B88309593aB921",
  [Chain.ETHEREUM]: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  [Chain.MOONBEAM]: "0xF75F62464fb6ae6E7088b76457E164EeCfB07dB4",
};

export const AUSDC = {
  [Chain.AVALANCHE]: "0x57f1c63497aee0be305b8852b354cec793da43bb",
  [Chain.ETHEREUM]: "0x526f0a95edc3df4cbdb7bb37d4f7ed451db8e369",
  [Chain.MOONBEAM]: "0xd1633f7fb3d716643125d6415d4177bc36b7186b",
}
