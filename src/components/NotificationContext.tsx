import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

// Define the shape of the notification object
interface Notification {
  text: string;
  color: string;
  show: boolean;
}

// Create the context
const NotificationContext = createContext<{
  notification: Notification;
  showNotification: (text: string, color: string) => void;
} | undefined>(undefined);

// Create a custom hook to access the context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<Notification>({
    text: '',
    color: 'info',
    show: false,
  });

  const showNotification = (text: string, color: string) => {
    setNotification({ text, color, show: true });
  };

  const hideNotification = () => {
    setNotification({ ...notification, show: false });
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
      <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
        {notification.show && (
          <Toast
            className="d-inline-block m-1"
            bg={notification.color}
            onClose={() => hideNotification()}
            show={notification.show}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Notification</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body className={`text-white bg-${notification.color}`}>
              {notification.text}
            </Toast.Body>
          </Toast>
        )}
      </ToastContainer>
    </NotificationContext.Provider>
  );
};
