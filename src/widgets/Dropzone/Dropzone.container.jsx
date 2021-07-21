import React, { useState, useEffect } from 'react';
import DropzoneView from './Dropzone.view';

function DropzoneContainer({ inputMessage, fileType, onDropFile, progress, isUploading, ...rest }) {
  const [files, setFiles] = useState([]);

  const addFile = (file) => {
    setFiles(
      file.map((f) =>
        Object.assign(f, {
          preview: URL.createObjectURL(f),
        }),
      ),
    );
    onDropFile(file);
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <DropzoneView
      addFile={addFile}
      files={files}
      inputMessage={inputMessage}
      fileType={fileType}
      progress={{ isUploading, percent: Math.round((progress?.progress ?? 0) * 100) }}
      {...rest}
    />
  );
}

export default DropzoneContainer;
