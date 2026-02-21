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
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    background: theme.colors.dark[9] + 'CC',
    border: '1px solid ' + theme.colors.dark[9] + 'CC',
    cursor: 'pointer',
    '&:hover': {
      border: '1px solid ' + theme.colors.gray[0],
    },
    '&:checked': { 
      background: theme.colors.gray[0],
    },
  },
  inner: {
    '> svg > path': {
      fill: theme.colors.dark[9],
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
        root: classes.root, 
        input: `${classes.input} checkboxInput`, 
        inner: `${classes.inner} checkboxInner` }}
    />
  );
};

export default CheckboxField;
