import Interface from "./components/Interface";
import { useConnectedUser } from "./hooks/useConnectedUser";
import { ConnectWallet } from "./components/ConnectWallet";

export default function App() {
  const { user } = useConnectedUser();
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-12">
      {user && user !== "loading" ? (
        <Interface address={user.address} />
      ) : (
        <ConnectWallet />
      )}
    </div>
  );
}
