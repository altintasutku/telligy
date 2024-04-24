"use client";

import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/supabase-client";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfReader() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>();
  const searchParams = useSearchParams();
  const [scale, setScale] = useState(1);

  const supabase = createClient();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  if (!pdfFile) {
    supabase.storage
      .from("book_pdf")
      .download(`public/${searchParams.get("b")}.pdf`)
      .then((response) => {
        setPdfFile(response.data as File);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  useEffect(() => {
    document.body.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
  }, [])
  

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-screen h-screen relative flex">
      <div className="absolute top-0 right-0 left-0 z-50 bg-[#141414] px-6 py-4 grid grid-cols-3">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <HomeIcon size={16} /> Go home page
        </Link>
        <div className="text-center font-semibold text-lg">Book Name</div>
        <div className="flex justify-end items-center gap-5">
          {scale.toFixed(1)}x
          <Button
            onClick={() => {
              setScale(1);
              setPageNumber(1);
            }}
          >
            Reset Zoom
          </Button>
        </div>
      </div>
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        className={
          "relative flex w-full pt-16 items-center justify-center gap-1 overflow-auto flex-1"
        }
      >
        <Page
          renderTextLayer={false}
          renderAnnotationLayer={false}
          pageNumber={pageNumber}
          className={"flex justify-center items-center select-none"}
          scale={scale}
        />
        <Page
          renderTextLayer={false}
          renderAnnotationLayer={false}
          pageNumber={pageNumber + 1}
          className={cn("flex justify-center items-center select-none", {
            hidden: pageNumber + 1 > (numPages || 1),
          })}
          scale={scale}
        />
      </Document>
      <div className="flex justify-center items-center gap-4 fixed left-1/2 bottom-0 md:bottom-10 w-screen md:w-auto -translate-x-1/2 z-50 bg-[#141414] md:rounded-full px-16 py-3 transition-all shadow-md">
        <Button
          variant={"ghost"}
          onClick={() => {
            if (scale > 0.4) setScale((prev) => prev - 0.2);
          }}
        >
          <ZoomOutIcon />
        </Button>
        <Button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((prev) => prev - 1)}
        >
          <ArrowLeftIcon />
          <span className="sr-only">Previous Page</span>
        </Button>
        <p className="text-center">
          {pageNumber} - {pageNumber + 1 <= (numPages || 1) && pageNumber + 1} /{" "}
          {numPages}
        </p>
        <Button
          disabled={pageNumber + 1 === numPages}
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          <ArrowRightIcon />
          <span className="sr-only">Next Page</span>
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => {
            if (scale < 3.4) setScale((prev) => prev + 0.2);
          }}
        >
          <ZoomInIcon />
        </Button>
      </div>
    </div>
  );
}
