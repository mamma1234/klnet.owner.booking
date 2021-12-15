import React, {useState, useEffect} from 'react';
// import {pdfjs} from 'react-pdf';
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack';

export default function PdfViewer( props ) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdf, setPdf] = useState(null);

    useEffect(()=>{
        setPdf(props.pdf);
    },[props])

    function onDocumentLoadSuccess( {numPages} ) {
        setNumPages( numPages );
    }

    return(
        <>
            <Document
                file={props.pdf}
                onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
            {/* 이전 페이지 보기 */}
            <span onClick={()=>pageNumber>1?setPageNumber(pageNumber-1):null}>&lt;</span>
            <span>Page {pageNumber} of {numPages}</span>
            {/* 다음 페이지 보기 */}
            <span onClick={()=>pageNumber < numPages ? setPageNumber(pageNumber+1):null}>&gt;</span>
            </p>
        </>
    );
}