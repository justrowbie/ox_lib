import { NumberInput, createStyles } from '@mantine/core';
import { INumber } from '../../../../typings/dialog';
import { Control, useController } from 'react-hook-form';
import { FormValues } from '../../InputDialog';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  row: INumber;
  index: number;
  control: Control<FormValues>;
}

const useStyles = createStyles((theme) => ({
  inputIcon: {
    color: theme.colors.dark[0],
  },
  label: {
    color: theme.colors.dark[0],
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'uppercase'
  },
  description: {
    color: theme.colors.dark[2],
    fontSize: '12px',
    fontWeight: 300,
  },
  input: {
    color: theme.colors.dark[0],
    background: theme.colors.dark[9] + 'CC',
    border: '1px solid ' + theme.colors.dark[9] + 'CC',
    cursor: 'pointer',
    '&:hover': {
      border: '1px solid ' + theme.colors.dark[0],
    },
  },
}))

const NumberField: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    defaultValue: props.row.default,
    rules: { required: props.row.required, min: props.row.min, max: props.row.max },
  });
  const { classes } = useStyles();
  return (
    <NumberInput
      value={controller.field.value}
      name={controller.field.name}
      ref={controller.field.ref}
      onBlur={controller.field.onBlur}
      onChange={controller.field.onChange}
      label={props.row.label}
      description={props.row.description}
      defaultValue={props.row.default}
      min={props.row.min}
      max={props.row.max}
      step={props.row.step}
      precision={props.row.precision}
      disabled={props.row.disabled}
      icon={props.row.icon && <LibIcon className={classes.inputIcon} icon={props.row.icon} fixedWidth />}
      withAsterisk={props.row.required}
      classNames={{
        label: classes.label,
        description: classes.description,
        input: classes.input,
      }}
    />
  );
};

export default NumberField;
