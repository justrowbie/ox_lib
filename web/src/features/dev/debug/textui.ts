import { TextUiProps } from '../../../typings';
import { debugData } from '../../../utils/debugData';

export const debugTextUI = () => {
  debugData<TextUiProps>([
    {
      action: 'textUi',
      data: {
        control: 'E',
        text: 'Open right center inventory',
        position: 'right-center',
        icon: 'door-open',
      },
    },
    {
      action: 'textUi',
      data: {
        control: 'G',
        text: 'Close right center inventory',
        position: 'right-center',
        icon: 'door-closed',
      },
    },
    // {
    //   action: 'textUi',
    //   data: {
    //     control: 'E',
    //     text: 'Open left center inventory',
    //     position: 'left-center',
    //     icon: 'door-open',
    //   },
    // },
    // {
    //   action: 'textUi',
    //   data: {
    //     control: 'G',
    //     text: 'Close left center inventory',
    //     position: 'left-center',
    //     icon: 'door-closed',
    //   },
    // },
    // {
    //   action: 'textUi',
    //   data: {
    //     control: 'E',
    //     text: 'Open top center inventory',
    //     position: 'top-center',
    //     icon: 'door-open',
    //   },
    // },
    // {
    //   action: 'textUi',
    //   data: {
    //     control: 'G',
    //     text: 'Close top center inventory',
    //     position: 'top-center',
    //     icon: 'door-closed',
    //   },
    // },
    // {
    //   action: 'textUi',
    //   data: {
    //     control: 'E',
    //     text: 'Open bottom center inventory',
    //     position: 'bottom-center',
    //     icon: 'door-open',
    //   },
    // },
    // {
    //   action: 'textUi',
    //   data: {
    //     control: 'G',
    //     text: 'Close bottom center inventory',
    //     position: 'bottom-center',
    //     icon: 'door-closed',
    //   },
    // },
  ]);
};
