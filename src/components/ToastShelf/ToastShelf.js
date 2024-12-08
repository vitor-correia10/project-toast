import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({toasts, handleDisplayMessage}) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map(({variant, id, message}) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast id={id} variant={variant} handleDisplayMessage={handleDisplayMessage}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
