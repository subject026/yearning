import { useConnect } from "wagmi";

export function ConnectWallet() {
  const { connect, connectors } = useConnect();
  const connector = connectors[0];
  return (
    <div>
      <button onClick={() => connect({ connector })}>Connect Wallet</button>
    </div>
  );
}
