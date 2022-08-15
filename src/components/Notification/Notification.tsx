/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */
import { FC } from 'react';

import classNames from './Notification.module.scss';

interface NotificationProps {
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  style?: React.CSSProperties;
}

const Notification: FC<NotificationProps> = ({ title, message, onConfirm, onCancel, style }) => {
  return (
    <div className={classNames.notification} style={style}>
      {title && <h2 className={classNames.title}>{title}</h2>}
      <div className={classNames.notificationContent}>
        <img className={classNames.icon} src="/static/alert.svg" alt="" />
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
    </div>
  );
};

export default Notification;
