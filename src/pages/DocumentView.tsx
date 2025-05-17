import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { IDocument } from "../types";

import PDFViewer from "../components/PDFViewer";
import { deleteDocument } from "../utils/storage";
import { Bounce, toast } from "react-toastify";

const pdfContentType = "application/pdf";

const base64toBlob = (data: string) => {
  const base64WithoutPrefix = data.substr(
    `data:${pdfContentType};base64,`.length
  );

  const bytes = atob(base64WithoutPrefix);
  let length = bytes.length;
  const out = new Uint8Array(length);

  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }

  return new Blob([out], { type: pdfContentType });
};

const DocumentView: React.FC = () => {
  const [document, setDocument] = useState<IDocument | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) {
      setError("No document ID provided");
      return;
    }

    const history = localStorage.getItem("documentsHistory");
    if (history) {
      const documents: IDocument[] = JSON.parse(history);
      const foundDoc = documents.find((doc) => doc.id === id);
      if (foundDoc) {
        setDocument(foundDoc);
        const base64 = foundDoc?.pdfBase64;
        const url = URL.createObjectURL(
          base64toBlob(`data:application/pdf;base64,${base64}`)
        );
        setPdfUrl(url);
      } else {
        setError("Document not found");
      }
    } else {
      setError("No documents in history");
    }
  }, [id]);

  const handleSave = () => {
    if (pdfUrl) {
      const link = window.document.createElement("a");
      link.href = pdfUrl;
      link.download = `document-${id}.pdf`;
      link.click();
    }
  };

  const handleDelete = () => {
    if (!document?.id) {
      return;
    }

    toast.error("Document successfully deleted");

    deleteDocument(document.id);
    navigate("/");
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleShareDocument = async () => {
    try {
      const url = `${window.location.origin}/document?id=${document?.id}`;
      await navigator.clipboard.writeText(url);

      toast.info("Document URL copied to clipboard", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch {
      toast.error("Failed to copy document");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-between mb-6 ">
          <h1 className="text-2xl mb-4 font-bold text-gray-800">PDF View</h1>
          <div className="[&::-webkit-scrollbar]:w-15 flex py-[8px] md:py-0 md:justify-center w-full overflow-x-scroll sm:overflow-x-auto space-x-4">
            <button
              onClick={handleSave}
              disabled={!document}
              className="px-4 py-2 bg-blue-600 min-w-[150px] text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleDelete}
              disabled={!document}
              className="px-4 py-2 bg-red-600 min-w-[150px] text-white rounded-lg shadow-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Delete Document
            </button>
            <button
              onClick={handleShareDocument}
              disabled={!document}
              className="px-4 py-2 bg-green-600 min-w-[150px] text-white rounded-lg shadow-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors"
            >
              Share
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 min-w-[150px] text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        <div className="h-[90vh] bg-white rounded-lg shadow-md overflow-hidden">
          {error ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-lg">{error}</p>
            </div>
          ) : pdfUrl ? (
            <PDFViewer fileUrl={pdfUrl} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentView;
