import { useState, useEffect } from "react";

import type { IDocument } from "../types";

export const useDocumentsHistory = () => {
  const [history, setHistory] = useState<IDocument[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("documentsHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const addHistory = (item: IDocument) => {
    // Only for 30 items
    const updated = [item, ...history]?.slice(0, 30);
    setHistory(updated);
    localStorage.setItem("documentsHistory", JSON.stringify(updated));
  };

  return { history, addHistory };
};
