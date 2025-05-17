import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ConvertButton from "../components/ConvertButton";
import TextInput from "../components/TextInput";
import { useDocumentsHistory } from "../hooks/useDocumentsHistory";
import { usePDFConversion } from "../hooks/usePDFConversion";
import type { IDocument } from "../types";
import TextArea from "../components/TextArea";

const Create: React.FC = () => {
  const navigate = useNavigate();
  const { addHistory } = useDocumentsHistory();
  const { convertPDF, isPending } = usePDFConversion();

  const [docName, setDocName] = useState("");
  const [text, setText] = useState("");

  const handleConvert = async () => {
    try {
      const convertedDocument = await convertPDF(text);

      const documentId = crypto.randomUUID();
      const newItem: IDocument = {
        id: documentId,
        text,
        title: docName,
        pdfBase64: convertedDocument?.base64,
        timestamp: new Date().toLocaleString(),
      };
      addHistory(newItem);

      navigate(`/document?id=${documentId}`);
    } catch {
      console.error("Conversion failed");
    }
  };

  const handleNavigateToHomePage = () => {
    navigate("/");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Create a new PDF File
      </h1>
      <button
        className="px-6 py-3 mb-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        onClick={handleNavigateToHomePage}
      >
        Return to Home page
      </button>
      <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          You haven't created any PDF files yet
        </h2>
        <p className="text-gray-500 mb-6 max-w-md">
          Start creating your first PDF document now. It's quick and easy!
        </p>

        <TextInput
          value={docName}
          onChange={setDocName}
          placeholder="Enter file name"
        />
        <TextArea
          value={text}
          onChange={setText}
          placeholder="Enter text for PDF"
        />
        <ConvertButton onClick={handleConvert} disabled={isPending || !text} />
      </div>
    </div>
  );
};

export default Create;
