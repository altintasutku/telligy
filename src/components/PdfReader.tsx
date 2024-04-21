"use client";

import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfReader() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="w-screen h-screen relative">
      <div className="absolute top-0 right-0 left-0 z-50 bg-[#141414] px-6 py-4 grid grid-cols-3">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <HomeIcon size={16} /> Go home page
        </Link>
        <div className="text-center font-semibold text-lg">Book Name</div>
        <div></div>
      </div>
      <Document file="my_pdf_file.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} className={"flex justify-center items-center"} />
      </Document>
      <div className="flex items-center gap-4 absolute left-1/2 -translate-x-1/2 z-50 bg-[#141414] rounded-full px-16 py-2">
        <Button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((prev) => prev - 1)}
        >
          <ArrowLeftIcon />
          <span className="sr-only">Previous Page</span>
        </Button>
        <p>
          {pageNumber} / {numPages}
        </p>
        <Button
          disabled={pageNumber === numPages}
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          <ArrowRightIcon />
          <span className="sr-only">Next Page</span>
        </Button>
      </div>
    </div>
  );
}
