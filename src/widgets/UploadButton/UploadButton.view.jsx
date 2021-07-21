import CSVReader from 'react-csv-reader';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ButtonWithIcon } from '../Buttons/Buttons';
import styles from './uploadButton.module.scss';

function UploadButtonView({
  isFileInvalid,
  normalizeHeader,
  handleChangeFile,
  isUploading,
  handleSubmitFile,
  hasFileSelected,
  label,
  actualFileName,
  icon,
  t,
  buttonRender,
  hasInvalidDates,
  checkingProgress,
  isCheckingFile,
  disabled,
}) {
  const parsingOption = {
    header: true,
    skipEmptyLines: 'greedy',
    escapeFormulae: true,
    transformHeader: (data) => normalizeHeader(data),
  };

  const FILES_STATUS = {
    noFile: { label: t('chooseFile'), color: '#a0a0a0' },

    isValid: { label: actualFileName, color: '#37A745' },

    isInvalid: { label: t('invalid'), color: '#C82333' },
  };

  const getFileStatus = () => {
    if (!hasFileSelected || disabled) {
      return 'noFile';
    } else if (isFileInvalid || hasInvalidDates) {
      return 'isInvalid';
    } else {
      return 'isValid';
    }
  };

  const CustomButton = (props) => buttonRender(props);

  const statusColor = FILES_STATUS[getFileStatus()].color;
  const statusFile = FILES_STATUS[getFileStatus()].label;
  const canUpload = !isFileInvalid && hasFileSelected;
  const disabledButton = isFileInvalid || !hasFileSelected || isCheckingFile || hasInvalidDates;

  return (
    <div className={styles.uploadGroupButtons}>
      <CSVReader
        onFileLoaded={(data, fileInfo) => handleChangeFile(data, fileInfo)}
        parserOptions={parsingOption}
        inputId="file"
        inputName="file"
        disabled={disabled}
      />
      <label
        htmlFor="file"
        className={styles.label}
        style={{ border: `2px solid ${statusColor}`, color: `${statusColor}` }}>
        <span className={styles.textLabel}>{statusFile}</span>
      </label>

      {buttonRender ? (
        <CustomButton
          disabled={disabledButton}
          onClick={() => handleSubmitFile()}
          checkingProgress={checkingProgress}
          isCheckingFile={isCheckingFile}
          isUploading={isUploading}
        />
      ) : (
        <ButtonWithIcon
          variant="contained"
          className={canUpload ? styles.iconBtnValid : styles.iconBtn}
          size="small"
          startIcon={!isUploading && icon}
          onClick={() => handleSubmitFile()}
          disabled={disabledButton}>
          {isUploading ? <CircularProgress className={styles.spinner} size="1.5rem" /> : label}
        </ButtonWithIcon>
      )}
    </div>
  );
}

export default UploadButtonView;
