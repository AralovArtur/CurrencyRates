import { notification } from 'antd';

export const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message,
        description,
        className: 'fit-content-notification',
        duration: type === 'error' ? 0 : 7,
    });
};
