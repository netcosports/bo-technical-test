import React, { useState } from 'react';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import FaIcon from '../icons/FaIcons';
import UploadButtonView from './UploadButton.view';

import useTranslate from '../../utils/hooks/useTranslate';

import texts from './uploadButton.texts';

// removes accents from csv header entries
function slugify(str) {
  const map = {
    a: 'á|à|ã|â|À|Á|Ã|Â',
    e: 'é|è|ê|É|È|Ê',
    i: 'í|ì|î|Í|Ì|Î',
    o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
    u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
    c: 'ç|Ç',
    n: 'ñ|Ñ',
  };
  for (const pattern in map) {
    str = str.replace(new RegExp(map[pattern], 'g'), pattern);
  }
  return str;
}

// transforms a string to camelCase string
function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

function UploadButtonContainer({
  label,
  permittedHeaders,
  handleChangeFile,
  actualFile,
  actualFileInfo,
  isUploading,
  handleSubmitFile,
  buttonRender,
  hasInvalidDates,
  checkingProgress,
  isCheckingFile,
  headerMapper,
  disabled,
}) {
  const [isFileInvalid, setIsFileInvalid] = useState(false);

  const { t } = useTranslate(texts);

  const validateHeader = (value, permittedValues) => {
    const isValid = permittedValues?.some((header) => header === value);
    if (!isValid) {
      setIsFileInvalid(true);
    } else {
      setIsFileInvalid(false);
    }
  };

  const normalizeHeader = (value) => {
    let normalizedValue;

    if (!!headerMapper) {
      normalizedValue = value.toLowerCase() === 'date' ? 'date' : headerMapper[value];
    } else {
      normalizedValue = camelize(slugify(value?.toLowerCase()));
    }

    validateHeader(!!headerMapper ? value : normalizedValue, permittedHeaders);

    return normalizedValue;
  };

  return (
    <div>
      <UploadButtonView
        isFileInvalid={isFileInvalid}
        normalizeHeader={normalizeHeader}
        handleSubmitFile={handleSubmitFile}
        hasFileSelected={!!actualFile}
        disabled={disabled}
        actualFileName={actualFileInfo?.name}
        handleChangeFile={handleChangeFile}
        isUploading={isUploading}
        label={label}
        icon={<FaIcon name={faUpload} />}
        t={t}
        buttonRender={buttonRender}
        hasInvalidDates={hasInvalidDates}
        checkingProgress={checkingProgress}
        isCheckingFile={isCheckingFile}
      />
    </div>
  );
}

export default UploadButtonContainer;
