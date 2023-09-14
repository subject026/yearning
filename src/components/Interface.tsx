import { CONTRACT_ADDRESS, WETH_ADDRESS, YV_WETH_ADDRESS } from "@/constants";
import useDebounce from "@/hooks/useDebounce";
import { useTokenAllowance } from "@/hooks/useTokenAllowance";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { useState } from "react";
import { Address, parseEther } from "viem";
import {
  erc20ABI,
  useContractWrite,
  useDisconnect,
  usePrepareContractWrite,
} from "wagmi";

import CONTRACT_ABI from "@/abi/CONTRACT.json";

export default function Interface({ address }: { address: Address }) {
  const { disconnectAsync } = useDisconnect();

  const { value: allowanceValue } = useTokenAllowance(
    WETH_ADDRESS,
    address,
    CONTRACT_ADDRESS
  );

  return (
    <section>
      <div className="pb-6">
        <button onClick={() => disconnectAsync()}>disconnect</button>
      </div>
      <div className="rounded border-2 border-neutral-300 p-4 mb-6">
        <WETHBalance address={address} />
        <YVWETHBalance address={address} />
      </div>

      <div className="p-4 rounded border-2 border-neutral-300 mb-12">
        {!allowanceValue ? <ApproveContract /> : <Deposit />}
      </div>
    </section>
  );
}

function WETHBalance({ address }: { address: Address }) {
  const { value } = useTokenBalance(WETH_ADDRESS, address);
  return (
    <div>
      <h2>WETH Balance: {value}</h2>
    </div>
  );
}

function YVWETHBalance({ address }: { address: Address }) {
  const { value } = useTokenBalance(YV_WETH_ADDRESS, address);
  return (
    <div>
      <h2>YV WETH Balance: {value}</h2>
    </div>
  );
}

function ApproveContract() {
  const MAX_INT = BigInt(
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  );

  const { config } = usePrepareContractWrite({
    address: WETH_ADDRESS,
    abi: erc20ABI,
    functionName: "approve",
    args: [CONTRACT_ADDRESS, MAX_INT],
  });

  const { write } = useContractWrite(config);

  const handleApproveContract = async () => {
    if (!write) return;
    write();
  };

  return (
    <>
      <p className="pb-4">Must approve contract before you can deposit WETH</p>
      <button onClick={handleApproveContract}>approve contract</button>
    </>
  );
}

function Deposit() {
  const [inputValue, setInputValue] = useState("");

  const debouncedValue = useDebounce(inputValue, 500);

  const parsedValue = parseEther(debouncedValue || "0");

  const prepareResult = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    args: [parsedValue],
    functionName: "deposit",
    enabled: parsedValue !== parseEther("0"),
  });

  const { config } = prepareResult;

  const { write } = useContractWrite(config);

  return (
    <section>
      <h2 className="pb-8">Deposit</h2>
      <input
        className="border border-neutral-400 rounded p-2 mb-4"
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <div>
        <button
          onClick={() => {
            write?.();
          }}
        >
          Submit
        </button>
      </div>
    </section>
  );
}
