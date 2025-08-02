import { debugData } from '../../../utils/debugData';
import type { InputProps } from '../../../typings';

export const debugInput = () => {
  debugData<InputProps>([
    {
      action: 'openDialog',
      data: {
        heading: 'Police locker',
        rows: [
          {
            type: 'input',
            label: 'Locker number',
            placeholder: '420',
            description: 'Description that tells you what this input field does',
          },
          {
            type: 'time',
            format: '12',
            label: 'Locker Time',
            description: 'Description that tells you what this input field does',
          },
          {
            type: 'date',
            label: 'Locker Date',
            description: 'Description that tells you what this input field does',
          },
          {
            type: 'color',
            label: 'Choose Color',
            description: 'Description that tells you what this input field does',
          },
          { type: 'checkbox', label: 'Some checkbox' },
          { 
            type: 'input',
            label: 'Locker PIN',
            description: 'Description that tells you what this input field does',
            password: true,
            icon: 'lock'
          },
          {
            type: 'select',
            label: 'Locker type',
            description: 'Description that tells you what this input field does',
            options: [
              { value: 'option1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
            ],
          },
          {
            type: 'number',
            label: 'Number counter',
            description: 'Description that tells you what this input field does',
            default: 12,
            min: 3,
            max: 10,
            icon: 'receipt',
          },
          {
            type: 'slider',
            label: 'Slide bar',
            min: 10,
            max: 50,
            step: 2,
          },
          {
            type: 'textarea',
            label: 'Put the description here',
            description: 'Description that tells you what this input field does',
          }
        ],
      },
    },
  ]);
};
