import React from 'react';
import useKeydown from '../../hooks/useKeyDown';

export const ToastContext = React.createContext();

function ToastProvider({children}) {
  const initialValue = [];
  const [toasts, setToasts] = React.useState(initialValue);

  useKeydown(() => {
    setToasts(initialValue)
  })
  
  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];

    setToasts(nextToasts);
  }

  function handleDismissMessage(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider 
      value={{
        toasts,
        createToast,
        handleDismissMessage,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider;
