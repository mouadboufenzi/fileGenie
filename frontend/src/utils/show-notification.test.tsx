/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { describe, it, vi, expect } from 'vitest';
import { showNotification } from './show-notification';

import { notifications } from '@mantine/notifications';
import { IoIosCheckmark, IoIosClose } from 'react-icons/io';

vi.mock('@mantine/notifications', () => ({
  notifications: {
    show: vi.fn(),
  },
}));

describe('showNotification', () => {
  it('should show a success notification', () => {
    const message = 'Success message';

    showNotification(message);

    expect(notifications.show).toHaveBeenCalledWith({
      message: expect.anything(),
      icon: <IoIosCheckmark size={80} />,
      color: 'green',
      bg: 'dark',
    });
  });

  it('should show an error notification', () => {
    const message = 'Error message';

    showNotification(message, false);

    expect(notifications.show).toHaveBeenCalledWith({
      message: expect.anything(),
      icon: <IoIosClose size={80} />,
      color: 'red',
      bg: 'dark',
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
});

