import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { PrimaryIconBtn } from '../Buttons/Buttons';

import styles from './pdfViewer.module.scss';

function PdfViewerView({ pdfFile, fileWithMeta, height, ...rest }) {
  const [totalNumPages, setTotalNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalNumPages(numPages);
  };

  const handleNavigate = (e, action) => {
    e.stopPropagation();
    if (action === 'next' && pageNumber < totalNumPages) {
      setPageNumber(pageNumber + 1);
    } else if (action === 'prev' && pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <>
      <div className={styles.pdfPreviewWrapper}>
        <Document
          file={pdfFile}
          className={styles.pdfDocument}
          onLoadSuccess={onDocumentLoadSuccess}
          {...rest}>
          <Page pageNumber={pageNumber} className={styles.pdfPage} width={400} />
          <div className={styles.navBtnWrapper}>
            <PrimaryIconBtn
              icon={<NavigateBeforeIcon />}
              onClick={(e) => handleNavigate(e, 'prev')}
            />
            <span>
              {pageNumber}/{totalNumPages}
            </span>
            <PrimaryIconBtn
              icon={<NavigateNextIcon />}
              onClick={(e) => handleNavigate(e, 'next')}
            />
          </div>
        </Document>
      </div>
    </>
  );
}

export default PdfViewerView;
