import { Checkbox, createStyles } from '@mantine/core';
import { ICheckbox } from '../../../../typings/dialog';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  row: ICheckbox;
  index: number;
  register: UseFormRegisterReturn;
}

const useStyles = createStyles((theme) => ({
  label: {
    color: theme.colors.gray[0],
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'uppercase'
  },
  input: {
    color: theme.colors.gray[0],
    backgroundColor: theme.colors.dark[3] + '80',
    border: '1px solid ' + theme.colors.gray[0] + '80',
    cursor: 'pointer',
    '&:hover': {
      border: '1px solid ' + theme.colors[theme.primaryColor][6] + 'CC',
    },
    '&:checked': {
      backgroundColor: theme.colors[theme.primaryColor][6] + 'CC',
      border: '1px solid ' + theme.colors[theme.primaryColor][6] + 'CC',
    },
  },
}))

const CheckboxField: React.FC<Props> = (props) => {
const { classes } = useStyles();
  return (
    <Checkbox
      {...props.register}
      sx={{ display: 'flex' }}
      required={props.row.required}
      label={props.row.label}
      defaultChecked={props.row.checked}
      disabled={props.row.disabled}
      classNames={{
        label: classes.label,
        input: classes.input
      }}
    />
  );
};

export default CheckboxField;
