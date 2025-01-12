import { Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IoIosCheckmark, IoIosClose } from 'react-icons/io';

export function showNotification(message: string, success = true) {
  notifications.show({
    message: <Text c="white">{message}</Text>,
    icon: success ? <IoIosCheckmark size={80} /> : <IoIosClose size={80} />,
    color: success ? 'green' : 'red',
    bg: 'dark'
  });
}
