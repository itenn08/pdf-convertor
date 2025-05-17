import { renderHook, act } from "@testing-library/react";
import axios from "axios";
import { usePDFConversion } from "./usePDFConversion";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

interface IMockFileReader {
  readAsDataURL: jest.Mock<void, [Blob]>;
  onloadend: null | (() => void);
  onerror: any;
  result: string;
}

describe("usePDFConversion", () => {
  const mockFileReader: IMockFileReader = {
    readAsDataURL: jest.fn(),
    onloadend: null,
    onerror: null,
    result: "data:application/pdf;base64,mocked-base64-data",
  };

  const mockText = "Text example";
  const apiURL =
    "http://95.217.134.12:4010/create-pdf?apiKey=78684310-850d-427a-8432-4a6487f6dbc4";

  const setupFileReaderMock = () => {
    jest.spyOn(global, "FileReader").mockImplementation(() => {
      const reader = mockFileReader as unknown as FileReader;
      return reader;
    });

    mockFileReader.readAsDataURL.mockImplementation(() => {
      setTimeout(() => {
        if (mockFileReader.onloadend) {
          mockFileReader.onloadend();
        }
      }, 0);
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setupFileReaderMock();
  });

  it("should successfully convert text to PDF", async () => {
    const mockPdfBlob = new Blob(["mock pdf content"], {
      type: "application/pdf",
    });

    mockedAxios.post.mockResolvedValueOnce({ data: mockPdfBlob });

    const { result } = renderHook(() => usePDFConversion());

    expect(result.current.isPending).toBe(false);

    let pdfResult: { base64: string; blob: Blob } | undefined;

    await act(async () => {
      pdfResult = await result.current.convertPDF(mockText);
    });

    expect(result.current.isPending).toBe(false);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      apiURL,
      { text: mockText },
      { responseType: "blob" }
    );

    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(mockPdfBlob);

    expect(pdfResult).toEqual({
      base64: "mocked-base64-data",
      blob: mockPdfBlob,
    });
  });

  it("should handle error if API returns non-PDF blob", async () => {
    const mockNonPdfBlob = new Blob(["mock content"], { type: "text/plain" });

    mockedAxios.post.mockResolvedValueOnce({ data: mockNonPdfBlob });

    const { result } = renderHook(() => usePDFConversion());

    await expect(async () => {
      await act(async () => {
        await result.current.convertPDF(mockText);
      });
    }).rejects.toThrow("Received Blob is not a PDF");

    expect(result.current.isPending).toBe(false);
  });

  it("should handle API error", async () => {
    const apiError = new Error("API error");
    mockedAxios.post.mockRejectedValueOnce(apiError);

    const { result } = renderHook(() => usePDFConversion());

    await expect(async () => {
      await act(async () => {
        await result.current.convertPDF(mockText);
      });
    }).rejects.toThrow("API error");

    expect(result.current.isPending).toBe(false);
  });

  it("should handle error when converting blob to base64", async () => {
    const mockPdfBlob = new Blob(["mock pdf content"], {
      type: "application/pdf",
    });

    mockedAxios.post.mockResolvedValueOnce({ data: mockPdfBlob });

    mockFileReader.readAsDataURL.mockImplementation(() => {
      setTimeout(() => {
        if (mockFileReader.onerror) {
          mockFileReader.onerror(new Error("FileReader error"));
        }
      }, 0);
    });

    const { result } = renderHook(() => usePDFConversion());

    await expect(async () => {
      await act(async () => {
        await result.current.convertPDF(mockText);
      });
    }).rejects.toThrow("FileReader error");

    expect(result.current.isPending).toBe(false);
  });
});
