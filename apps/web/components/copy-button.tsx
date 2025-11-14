"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [tooltipText, setTooltipText] = useState("Copy to Clipboard");
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = async () => {
    navigator.clipboard.writeText(text);
    setTooltipText("Copied!");
    setIsCopied(true);

    setTimeout(async () => {
      setTooltipText("Copy to Clipboard");
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleClick}
          className="absolute top-3 right-3 size-8 shadow-none"
        >
          {isCopied ? (
            <Check className="w-4! h-4!" />
          ) : (
            <Copy className="w-4! h-4!" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltipText}</TooltipContent>
    </Tooltip>
  );
}
