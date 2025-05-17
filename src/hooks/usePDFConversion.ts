import axios from "axios";
import { useState } from "react";
import { envConfig } from "../config";

const API_URL = `${envConfig.API_URL}/create-pdf`;
const API_KEY = envConfig.API_KEY;

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        const base64 = reader?.result?.split(",")?.[1];
        resolve(base64);
      } else {
        reject(new Error("Failed to convert Blob to base64"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const usePDFConversion = () => {
  const [isPending, setIsPending] = useState(false);

  const convertPDF = async (text: string) => {
    try {
      setIsPending(true);
      const response = await axios.post(
        `${API_URL}?apiKey=${API_KEY}`,
        { text },
        { responseType: "blob" }
      );

      const pdfBlob = response.data;

      if (pdfBlob.type !== "application/pdf") {
        throw new Error("Received Blob is not a PDF");
      }
      const base64 = await blobToBase64(pdfBlob);
      setIsPending(false);
      return { base64, blob: pdfBlob };
    } catch (error) {
      setIsPending(false);
      console.error("PDF conversion failed:", error);
      throw error;
    }
  };

  return {
    convertPDF,
    isPending,
  };
};
