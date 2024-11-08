import { Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IoIosCheckmark, IoIosClose } from 'react-icons/io';

export function showNotification(message: string, success = true) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  notifications.show({
    message: <Text c="white">{message}</Text>,
    icon: success ? <IoIosCheckmark size={80} /> : <IoIosClose size={80} />,
    color: success ? 'green' : 'red',
    time: 2000,
    bg: 'dark'
  });
}
