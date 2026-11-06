import { useEffect } from 'react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const id = setTimeout(onClose, 4000);
    return () => clearTimeout(id);
  }, [message, onClose]);

  return (
    <div className="toast" role="status">
      {message}
    </div>
  );
}
