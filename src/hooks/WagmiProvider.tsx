import type { ReactNode } from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { hardhat } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

/* eslint-disable-next-line */
export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [{ ...hardhat }],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "http://localhost:8545",
        webSocket: "ws://localhost:8545",
      }),
    }),
  ]
);

const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

export default function WagmiProvider({ children }: { children: ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
