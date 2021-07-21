import React from 'react';
import PdfViewerView from './PdfViewer.view';

function PdfViewerContainer({ file, pdfUrl, height, ...rest }) {
  return <PdfViewerView {...rest} pdfFile={file} height={height} />;
}

export default PdfViewerContainer;
