import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({children}) {
  const initialValue = [];
  const [toasts, setToasts] = React.useState(initialValue);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        setToasts(initialValue);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    // clean up ungoing event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
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
