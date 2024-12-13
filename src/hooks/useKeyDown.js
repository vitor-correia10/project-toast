import React from 'react';

function useKeydown(callback) {
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        callback();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    // clean up ungoing event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]);

}



export default useKeydown;