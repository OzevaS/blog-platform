/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */
import { FC, useState } from 'react';

import classNames from './Notification.module.scss';

interface NotificationProps {
  title?: string;
  message: string;
  error?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  style?: React.CSSProperties;
}

const classNameNotification = (error: boolean) =>
  `${error ? classNames['notification--error'] : classNames.notification}`;

const Notification: FC<NotificationProps> = ({ title, message, error = false, onConfirm, onCancel, style }) => {
  const [visible, setVisible] = useState(true);

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className={`${classNameNotification(error)} ${!visible ? classNames.hidden : ''}`} style={style}>
      {title && <h2 className={classNames.title}>{title}</h2>}
      <div className={classNames.notificationContent}>
        {!error && <img className={classNames.icon} src="/static/alert.svg" alt="alert" />}
        <div className={classNames.message}>{message}</div>
      </div>
      {onConfirm && onCancel && (
        <div className={classNames.buttons}>
          <button type="button" className={classNames.button} onClick={onCancel}>
            No
          </button>
          <button type="button" className={classNames['button--yes']} onClick={onConfirm}>
            Yes
          </button>
        </div>
      )}
      <div className={classNames.close} onClick={onClose} />
    </div>
  );
};

export default Notification;
