import React from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
// eslint-disable-next-line import/no-unresolved
import 'react-toastify/dist/ReactToastify.css';

const SnackbarSettings = styled(ToastContainer)`
  .Toastify__toast--info {
    background: 'rgb(51, 102, 255)';
  }
  .Toastify__toast--success {
    background: 'rgb(51, 187, 102)';
  }
  .Toastify__toast--warning {
    background: 'rgb(254, 255, 20)';
  }
  .Toastify__toast--error {
    background: 'rgb(255, 102, 102)';
  }
`;

export const showSnackbar = ({ type, message }) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        autoClose: 3000,
      });

      break;
    case 'warn':
      toast.warn(message, {
        autoClose: 3000,
      });
      break;
    case 'error':
      toast.error(message, {
        autoClose: 3000,
      });
      break;
    default:
      toast.info(message, {
        autoClose: 4000,
      });
  }
};

export default function Alert() {
  return <SnackbarSettings />;
}
