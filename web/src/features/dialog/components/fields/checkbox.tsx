import { Checkbox, createStyles } from '@mantine/core';
import { ICheckbox } from '../../../../typings/dialog';
import { UseFormRegisterReturn } from 'react-hook-form';
import { icon } from '@fortawesome/fontawesome-svg-core';
import test from 'node:test';

interface Props {
  row: ICheckbox;
  index: number;
  register: UseFormRegisterReturn;
}

const useStyles = createStyles((theme) => ({
  label: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'uppercase'
  },
  input: {
    cursor: 'pointer',
    background: theme.colors[theme.primaryColor][0] + '1A',
    '&:hover': {
      border: '1px solid ' + theme.colors[theme.primaryColor][0],
    },
    '&:checked': {
      backgroundColor: theme.colors.green[6],
      borderColor: theme.colors.green[6],
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
        input: classes.input,
      }}
    />
  );
};

export default CheckboxField;
