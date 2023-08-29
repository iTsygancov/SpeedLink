import { useState } from "react";

type CopiedValue = boolean;
type CopyFn = (text: string) => Promise<boolean>;

export function useClipboard(): { isCopied: CopiedValue; copy: CopyFn } {
  const [isCopied, setIsCopied] = useState<CopiedValue>(false);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      return false;
    }
  };

  return { isCopied, copy };
}
