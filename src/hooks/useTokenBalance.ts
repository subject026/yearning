import ERC20_ABI from "../abi/ERC20.json";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";

export interface UseTokenBalanceResult {
  value?: string;
  status: "error" | "idle" | "loading" | "success";
  error: Error | null;
}

export function useTokenBalance(
  tokenAddress: `0x${string}`,
  holderAddress: string
): UseTokenBalanceResult {
  const { data, status, error } = useContractRead({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [holderAddress],
    watch: true,
  });

  const value = data ? formatUnits(BigInt(data as string), 18).toString() : "0";

  return { value, status, error };
}
