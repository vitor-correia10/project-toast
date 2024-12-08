import React from 'react';
import Button from '../Button';
import ToastShelf from '../ToastShelf';
import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [message, setMessage] = React.useState('');
  const [toasts, setToasts] = React.useState([]);
  const isEmptyToast = message.length === 0;

  function handleSubmit(event) {
    event.preventDefault();

    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];

    setToasts(nextToasts);

    setMessage('');
    setVariant(VARIANT_OPTIONS[0]);
  }

  function handleDisplayMessage(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} handleDisplayMessage={handleDisplayMessage}/>

      <form className={styles.controlsWrapper} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea 
              id="message" 
              className={styles.messageInput} 
              value={message} onChange={(event) => setMessage(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
          {VARIANT_OPTIONS.map((item) => (
            <label key={item} htmlFor={`variant-${item}`}>
              <input
                id={`variant-${item}`}
                type="radio"
                name={item}
                value={item}
                checked={item === variant}
                onChange={(event) => setVariant(event.target.value)}
              />
              {item}
            </label>
          ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button disabled={isEmptyToast}>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
