/* eslint-disable no-use-before-define */
import { toast } from 'react-toastify';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import { colors } from '../../muiColors';
import './notifications.scss';

const defaultOptions = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 2000,
  pauseOnHover: false,
  closeOnClick: true,
  pauseOnFocusLoss: false,
};

const notif = (label, options) => {
  return toast(label, { ...defaultOptions, ...options });
};

export const notifSuccess = (label) => {
  const successOptions = {
    type: toast.TYPE.SUCCESS,
  };
  return notif(label, successOptions);
};

export const notifError = (label) => {
  const errorOptions = {
    type: toast.TYPE.ERROR,
  };
  return notif(label, errorOptions);
};

export const notifInfo = (label) => {
  const infoOptions = {
    type: toast.TYPE.INFO,
    style: { backgroundColor: colors.darkGray2 },
  };
  return notif(label, infoOptions);
};

export const confirmAction = (message, labelYes = 'Yes', labelNo = 'No') => {
  return new Promise((resolve) => {
    const confirmOptions = {
      type: toast.TYPE.WARNING,
      autoClose: false,
      pauseOnHover: false,
      closeOnClick: false,
      closeButton: false,
    };
    const ToastContent = () => (
      <div className="toastContainer">
        <div>{message}</div>
        <div className="btnWrapper">
          <button
            type="button"
            className="yesBtn"
            onClick={() => {
              toast.dismiss(toastId);
              resolve(true);
            }}>
            <CheckIcon fontSize="small" />
            <span>{labelYes}</span>
          </button>
          <button
            type="button"
            className="noBtn"
            onClick={() => {
              toast.dismiss(toastId);
              resolve(false);
            }}>
            <ClearIcon fontSize="small" />
            <span>{labelNo}</span>
          </button>
        </div>
      </div>
    );
    const toastId = notif(<ToastContent />, confirmOptions);
  });
};
