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
    backgroundColor: theme.colors.dark[3] + 'E9',
  },
  label: {
    color: theme.colors.gray[0],
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'uppercase'
  },
  description: {
    color: theme.colors.gray[6],
    fontSize: '12px',
    fontWeight: 500,
  },
  input: {
    backgroundColor: theme.colors.dark[3] + '80',
    color: theme.colors.gray[0],
    border: '1px solid ' + theme.colors.gray[0] + '80',
    cursor: 'pointer',
    '&:hover': {
      border: '1px solid ' + theme.colors[theme.primaryColor][6] + 'CC',
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
