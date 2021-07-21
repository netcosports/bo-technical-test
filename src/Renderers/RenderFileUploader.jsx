import React, { useState } from 'react';

import useS3Upload from '../utils/hooks/useS3Upload';

import Dropzone from '../widgets/Dropzone';

function RenderFileUploader({
  fileType,
  label,
  awsPath,
  input: { onChange, value },
  meta,
  ...rest
}) {
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadFile, progress } = useS3Upload();
  if (!awsPath) {
    // eslint-disable-next-line no-console
    console.error('you must provide an upload path');
  }

  const onDropFile = async (files) => {
    const fileToUpload = files[0];
    const uploadConfig = {
      awsPath,
    };
    try {
      setIsUploading(true);
      const fileUrl = await uploadFile(fileToUpload, uploadConfig);
      onChange(fileUrl);
      setIsUploading(false);
    } catch (error) {
      setUploadError(error);
    }
  };

  return (
    <Dropzone
      fileType={fileType}
      inputMessage={label}
      value={value}
      {...rest}
      onDropFile={onDropFile}
      progress={progress}
      error={uploadError ? uploadError : meta?.error}
      isUploading={isUploading}
    />
  );
}

export default RenderFileUploader;
