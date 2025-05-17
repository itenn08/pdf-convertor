import type { IDocument } from "../types";

export const deleteDocument = (id: string): boolean => {
  try {
    const history = localStorage.getItem("documentsHistory");
    if (!history) {
      return false;
    }

    const documents: IDocument[] = JSON.parse(history);
    const updatedDocuments = documents?.filter((doc) => doc?.id !== id);

    if (documents.length === updatedDocuments.length) {
      return false;
    }

    localStorage.setItem("documentsHistory", JSON.stringify(updatedDocuments));
    return true;
  } catch (e) {
    console.error("Error deleting document:", e);
    return false;
  }
};

export const clearStorage = (): boolean => {
  try {
    localStorage.removeItem("documentsHistory");
    return true;
  } catch (e) {
    console.error("Error clearing storage:", e);
    return false;
  }
};
