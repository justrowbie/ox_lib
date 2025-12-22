import { NotificationProps } from '../../../typings';
import { debugData } from '../../../utils/debugData';

export const debugCustomNotification = () => {
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        title: 'Success',
        description: 'Notification description',
        type: 'success',
        id: 'pogchamp',
        duration: 3000,
        position: "top",
        style: {
          '.description': {
            color: 'red',
          },
        },
      },
    },
  ]);
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        duration: 3000,
        description: 'Notification description',
        type: 'error',
        position: "bottom"
      },
    },
  ]);
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        title: 'Custom icon success',
        duration: 3000,
        description: 'Notification description',
        type: 'success',
        icon: 'microchip',
        position: "top-left"
      },
    },
  ]);
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        title: 'Custom icon success',
        duration: 3000,
        description: 'Notification description',
        type: 'success',
        icon: 'microchip',
        position: "bottom-left"
      },
    },
  ]);
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        title: 'Custom icon success',
        duration: 3000,
        description: 'Notification description',
        type: 'success',
        icon: 'microchip',
        position: "top-right"
      },
    },
  ]);
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        title: 'Custom icon success',
        duration: 3000,
        description: 'Notification description',
        type: 'success',
        icon: 'microchip',
        position: "bottom-right"
      },
    },
  ]);
};
