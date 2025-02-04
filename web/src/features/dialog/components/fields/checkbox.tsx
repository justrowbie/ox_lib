import { Checkbox, useMantineTheme } from '@mantine/core';
import { ICheckbox } from '../../../../typings/dialog';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  row: ICheckbox;
  index: number;
  register: UseFormRegisterReturn;
}

const CheckboxField: React.FC<Props> = (props) => {
const theme = useMantineTheme();
  return (
    <Checkbox
      {...props.register}
      sx={{ display: 'flex' }}
      required={props.row.required}
      label={props.row.label}
      defaultChecked={props.row.checked}
      disabled={props.row.disabled}
      styles={{
        input:{
          backgroundColor: 'transparent',
          borderColor: theme.colors.gray[6]
        },
      }}
    />
  );
};

export default CheckboxField;
