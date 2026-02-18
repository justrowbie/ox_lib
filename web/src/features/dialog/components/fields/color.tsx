import { IColorInput } from '../../../../typings/dialog';
import { Control, useController } from 'react-hook-form';
import { FormValues } from '../../InputDialog';
import { ColorInput, createStyles } from '@mantine/core';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  row: IColorInput;
  index: number;
  control: Control<FormValues>;
}

const useStyles = createStyles((theme) => ({
  dropdown: {
    background: theme.colors.dark[9],
    color: theme.colors.dark[9],
    border: 'none',
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

const ColorField: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    defaultValue: props.row.default,
    rules: { required: props.row.required },
  });
  const { classes } = useStyles();
  return (
    <ColorInput
      withEyeDropper={false}
      value={controller.field.value}
      name={controller.field.name}
      ref={controller.field.ref}
      onBlur={controller.field.onBlur}
      onChange={controller.field.onChange}
      label={props.row.label}
      description={props.row.description}
      disabled={props.row.disabled}
      defaultValue={props.row.default}
      format={props.row.format}
      withAsterisk={props.row.required}
      icon={props.row.icon && <LibIcon icon={props.row.icon} fixedWidth />}
      classNames={{
        label: classes.label,
        description: classes.description,
        input: classes.input,
        dropdown: classes.dropdown
      }}
    />
  );
};

export default ColorField;
