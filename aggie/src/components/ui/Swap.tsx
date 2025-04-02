"use client";

import { useState, useEffect } from "react";
import { ArrowDown, RefreshCw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Define token interface
interface Token {
  id: string;
  name: string;
  symbol: string;
  logo: string;
}

// Define exchange rates interface
interface ExchangeRates {
  [key: string]: {
    [key: string]: number;
  };
}

// Mock token data
const tokens: Token[] = [
  { id: "eth", name: "Ethereum", symbol: "ETH", logo: "🔷" },
  { id: "usdc", name: "USD Coin", symbol: "USDC", logo: "💵" },
];

export const Swap = () => {
  const [fromToken, setFromToken] = useState<Token>(tokens[0]);
  const [toToken, setToToken] = useState<Token>(tokens[1]);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [rate, setRate] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTokenSelectFrom, setShowTokenSelectFrom] = useState<boolean>(false);
  const [showTokenSelectTo, setShowTokenSelectTo] = useState<boolean>(false);

  // Mock function to get quote
  const getQuote = async (
    from: Token | null,
    to: Token | null,
    amount: string
  ): Promise<void> => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock exchange rates
    const rates: ExchangeRates = {
      eth: { usdc: 3000},
      usdc: { eth: 0.00033},
    };

    if (!from || !to || !amount || parseFloat(amount) <= 0) {
      setToAmount("");
      setRate(0);
      setLoading(false);
      return;
    }

    const currentRate = rates[from.id][to.id];
    setRate(currentRate);
    setToAmount((parseFloat(amount) * currentRate).toFixed(6));
    setLoading(false);
  };

  useEffect(() => {
    if (fromAmount) {
      getQuote(fromToken, toToken, fromAmount);
    }
  }, [fromToken, toToken, fromAmount]);

  const handleSwapTokens = (): void => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = async (): Promise<void> => {
    setLoading(true);
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert(`Swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`);
    setLoading(false);
    setFromAmount("");
    setToAmount("");
  };

  interface TokenSelectProps {
    token: Token;
    onSelect: (token: Token) => void;
    side: "from" | "to";
  }

  const TokenSelect = ({ token, onSelect, side }: TokenSelectProps): JSX.Element => {
    return (
      <Dialog
        open={side === "from" ? showTokenSelectFrom : showTokenSelectTo}
        onOpenChange={
          side === "from" ? setShowTokenSelectFrom : setShowTokenSelectTo
        }
      >
        <DialogTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 px-3">
            <span className="text-xl">{token.logo}</span>
            <span>{token.symbol}</span>
            <span>▼</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a token</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            {tokens.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                onClick={() => {
                  onSelect(t);
                  if (side === "from") {
                    setShowTokenSelectFrom(false);
                  } else {
                    setShowTokenSelectTo(false);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.logo}</span>
                  <div>
                    <div>{t.name}</div>
                    <div className="text-sm text-slate-500">{t.symbol}</div>
                  </div>
                </div>
                <div>{t.balance}</div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Swap</h2>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* From token */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 mb-2">
            <div className="flex justify-between mb-2">
              <TokenSelect
                token={fromToken}
                onSelect={setFromToken}
                side="from"
              />
              <div className="text-sm text-slate-500">
                Balance: {fromToken.balance}
              </div>
            </div>
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="border-none text-2xl bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
            />
          </div>

          {/* Swap button */}
          <div className="flex justify-center -my-3 z-10 relative">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-slate-100 dark:bg-slate-800 h-10 w-10 border-4 border-slate-50 dark:border-slate-900"
              onClick={handleSwapTokens}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>

          {/* To token */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 mb-6">
            <div className="flex justify-between mb-2">
              <TokenSelect token={toToken} onSelect={setToToken} side="to" />
              <div className="text-sm text-slate-500">
                Balance: {toToken.balance}
              </div>
            </div>
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly
              className="border-none text-2xl bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
            />
          </div>

          {/* Rate info */}
          {rate > 0 && (
            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3 mb-6">
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  1 {fromToken.symbol} = {rate} {toToken.symbol}
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Swap button */}
          <Button
            className="w-full"
            size="lg"
            disabled={!fromAmount || !toAmount || loading}
            onClick={handleSwap}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>{fromAmount ? "Swapping..." : "Getting quote..."}</span>
              </div>
            ) : !fromAmount ? (
              "Enter an amount"
            ) : (
              "Swap"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
