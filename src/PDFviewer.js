// import React, { useState } from 'react';
// import { Document, Page , pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// function ExamplePDFViewer(props) {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   return (
//     <div>
//       <Document
//         file={{url: `${props.pdfFile}`}}
//         onLoadSuccess={onDocumentLoadSuccess}
//       >
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <p>Page {pageNumber} of {numPages}</p>
//     </div>
//   );
// }
// export default ExamplePDFViewer;

// import React from 'react'

// const ExamplePDFViewer = () => {
//   return (
//     <div>
//        <iframe src="https://drive.google.com/file/d/1a_K7LqjqmGbHwTDSy6bEWejRjQ_VonmN/preview" width="50%" height="300px"></iframe>

//     </div>
//   )
// }

// export default ExamplePDFViewer;

//DOCS------------

import './PDFviewer.css'
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Viewer = (props) => {
  const [pdf, setPdf] = useState();

  useEffect(() => {
    async function fetchStream() {
      if (true) {
        const rawres = await fetch(
          `https://www.googleapis.com/drive/v3/files/1NCe8bYqe51upbdaHNZ9jp2k1fJ4YardBqZ1Bauk6114/export?mimeType=application/pdf`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${props.token}`,
              "Content-Type": "application/pdf",
            },
          }
        );

        const res = await rawres.arrayBuffer();
        console.log(res);
        setPdf(new Uint8Array(res));
      }
    }
    fetchStream();
  }, []);

  console.log("pdf",pdf);

  return (
    <div>
      {pdf ? (
        <Document
          file={{ data: pdf }}
          // onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={1} />
          <br />
          
        </Document>
      ) : (
        <p style={{ margin: "auto", opacity: 0.7 }}>
          Please select a file to Preview
        </p>
      )}
    </div>
  );
};

export default Viewer;

//PDFF

// import { Document, Page, pdfjs } from "react-pdf";
// import { useEffect, useState } from "react";
// import "./PDFviewer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// const Viewer = (props) => {
//   const [pdf, setPdf] = useState();

//   useEffect(() => {
//     async function fetchStream() {
//       if (true) {
//         const rawres = await fetch("https://drive.google.com/uc?id=1a_K7LqjqmGbHwTDSy6bEWejRjQ_VonmN&export=download", {
//           // mode: "no-cors",
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${props.token}`,
//             "Content-Type": "application/pdf",
//           },
//         });
//         // const res = await rawres.json();
//         // console.log(res);
//         const headers = rawres.headers.get("Location");
//         const res = await rawres.arrayBuffer();
//         console.log(res);
//         console.log(headers);
//         setPdf(new Uint8Array(res));
//       }
//     }
//     fetchStream();
//   }, []);

//   console.log("pdf", pdf);

//   return (
//     <div>
//       {pdf ? (
//         <Document
//           file={{ data: pdf }}
//           // onLoadSuccess={onDocumentLoadSuccess}
//         >
//           <Page pageNumber={1} />
//           <br />
//         </Document>
//       ) : (
//         <p style={{ margin: "auto", opacity: 0.7 }}>
//           Please select a file to Preview
//         </p>
//       )}
//     </div>
//   );
// };

// export default Viewer;
