# Yearning

#### running locally

- rename `.env.example` to `.env` and add Infura API key

- install deps with `pnpm install`
- start local hardhat node `pnpm run hardhat:node`
- fund hardhat account #0 with WETH `pnpm run hardhat:fund`
- start dev server `pnpm run dev`

After taking private key for account #0 from `hardhat:node` cli output and adding the account to metamask you should be able to switch metamask network to localhost/hardhat and see a WETH balance of 30 once the wallet is connected.
