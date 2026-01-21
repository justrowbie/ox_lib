import { TextUiProps } from '../../../typings';
import { debugData } from '../../../utils/debugData';

// export const debugTextUI = () => {
//   debugData<TextUiProps>([
//     {
//       action: 'textUi',
//       data: {
//         control: 'E',
//         text: 'Open right center inventory',
//         position: 'right-center',
//         icon: 'door-open',
//       },
//     },
//     {
//       action: 'textUi',
//       data: {
//         control: 'G',
//         text: 'Close right center inventory',
//         position: 'right-center',
//         icon: 'door-closed',
//       },
//     },
//     // {
//     //   action: 'textUi',
//     //   data: {
//     //     control: 'E',
//     //     text: 'Open left center inventory',
//     //     position: 'left-center',
//     //     icon: 'door-open',
//     //   },
//     // },
//     // {
//     //   action: 'textUi',
//     //   data: {
//     //     control: 'G',
//     //     text: 'Close left center inventory',
//     //     position: 'left-center',
//     //     icon: 'door-closed',
//     //   },
//     // },
//     // {
//     //   action: 'textUi',
//     //   data: {
//     //     control: 'E',
//     //     text: 'Open top center inventory',
//     //     position: 'top-center',
//     //     icon: 'door-open',
//     //   },
//     // },
//     // {
//     //   action: 'textUi',
//     //   data: {
//     //     control: 'G',
//     //     text: 'Close top center inventory',
//     //     position: 'top-center',
//     //     icon: 'door-closed',
//     //   },
//     // },
//     // {
//     //   action: 'textUi',
//     //   data: {
//     //     control: 'E',
//     //     text: 'Open bottom center inventory',
//     //     position: 'bottom-center',
//     //     icon: 'door-open',
//     //   },
//     // },
//     // {
//     //   action: 'textUi',
//     //   data: {
//     //     control: 'G',
//     //     text: 'Close bottom center inventory',
//     //     position: 'bottom-center',
//     //     icon: 'door-closed',
//     //   },
//     // },
//   ]);
// };

export const debugTextUI = () => {
  debugData<TextUiProps>([
    {
      action: 'textUi',
      data: {
        control: 'E',
        text: 'Interact',
        position: 'right-center',
        icon: 'hand-pointer',
      },
    },
    {
      action: 'textUi',
      data: {
        control: 'Spacebar',
        text: 'Close menu',
        position: 'top-center',
        icon: 'times',
        iconColor: '#f44336',
      },
    },
    {
      action: 'textUi',
      data: {
        control: 'ESC',
        text: 'Close menu',
        position: 'bottom-center',
        icon: 'times',
        iconColor: '#f44336',
      },
    },
    {
      action: 'textUi',
      data: {
        text: 'Level up! You are now level 25',
        position: 'bottom-center',
        icon: 'arrow-up',
        iconColor: '#FFD700',
        iconAnimation: 'bounce',
      },
    },
    {
      action: 'textUi',
      data: {
        control: 'TAB',
        text: 'Open map',
        position: 'left-center',
        icon: 'map',
      },
    },
    {
      action: 'textUi',
      data: {
        text: 'Level up! You are now level 25',
        position: 'left-center',
        icon: 'arrow-up',
        iconColor: '#FFD700',
        iconAnimation: 'bounce',
      },
    },
  ]);
};