import { useEffect, useState } from "react";

import HistoryList from "../components/HistoryList";
import EmptyHistory from "../components/EmptyHistory";
import type { IDocument } from "../types";
import { clearStorage } from "../utils/storage";

const Home: React.FC = () => {
  const [documents, setDocuments] = useState<IDocument[]>([]);

  useEffect(() => {
    const history = localStorage.getItem("documentsHistory");
    if (history) {
      try {
        const documents: IDocument[] = JSON.parse(history);

        setDocuments(documents);
      } catch (e) {
        console.error("Error parsing documentsHistory:", e);
      }
    } else {
      console.log("No documentsHistory in localStorage");
    }
  }, []);

  const handleClearAllData = () => {
    clearStorage();
    setDocuments([]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">PDF Documents</h1>

      {documents?.length > 0 ? (
        <HistoryList
          documents={documents}
          onClearStorage={handleClearAllData}
        />
      ) : (
        <EmptyHistory />
      )}
    </div>
  );
};

export default Home;
