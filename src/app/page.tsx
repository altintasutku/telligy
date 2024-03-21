"use client";

import { pdfjs } from "react-pdf";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function Home() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file="my_pdf_file.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Button
        disabled={pageNumber === 1}
        onClick={() => setPageNumber((prev) => prev - 1)}
      >
        prev
      </Button>
      <Button
        disabled={pageNumber === numPages}
        onClick={() => setPageNumber((prev) => prev + 1)}
      >
        next
      </Button>
    </div>
  );
}
