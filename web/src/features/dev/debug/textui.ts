import { TextUiProps } from '../../../typings';
import { debugData } from '../../../utils/debugData';

export const debugTextUI = () => {
  debugData<TextUiProps>([
    {
      action: 'textUi',
      data: {
        button: 'E',
        text: 'Parking Area',
        position: 'right-center',
        icon: 'door-open',
      },
    },
    {
      action: 'textUi',
      data: {
        button: 'Z',
        text: 'Very Long Parking Area',
        position: 'right-center',
        icon: 'door-open',
      },
    },
  ]);
};
