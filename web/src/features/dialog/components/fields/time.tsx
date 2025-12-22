import { TimeInput } from '@mantine/dates';
import { Control, useController } from 'react-hook-form';
import { ITimeInput } from '../../../../typings/dialog';
import { FormValues } from '../../InputDialog';
import LibIcon from '../../../../components/LibIcon';
import { createStyles } from '@mantine/core';

interface Props {
  row: ITimeInput;
  index: number;
  control: Control<FormValues>;
}

const useStyles = createStyles((theme) => ({
  label: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'uppercase'
  },
  description: {
    color: theme.colors[theme.primaryColor][3],
    fontSize: '12px',
    fontWeight: 300,
  },
  input: {
    color: theme.colors[theme.primaryColor][0],
    background: theme.colors[theme.primaryColor][0] + '1A',
    border: '1px solid ' + theme.colors[theme.primaryColor][0] + '33',
    cursor: 'pointer',
    '&:hover': {
      border: '1px solid ' + theme.colors[theme.primaryColor][6] + 'CC',
    },
  },
}));

const TimeField: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    rules: { required: props.row.required },
  });
  const { classes } = useStyles();
  return (
    <TimeInput
      value={controller.field.value ? new Date(controller.field.value) : controller.field.value}
      name={controller.field.name}
      ref={controller.field.ref}
      onBlur={controller.field.onBlur}
      onChange={(date) => controller.field.onChange(date ? date.getTime() : null)}
      label={props.row.label}
      description={props.row.description}
      disabled={props.row.disabled}
      format={props.row.format || '12'}
      withAsterisk={props.row.required}
      clearable={props.row.clearable}
      icon={props.row.icon && <LibIcon fixedWidth icon={props.row.icon} />}
      classNames={{
        label: classes.label,
        description: classes.description,
        input: classes.input,
      }}
    />
  );
};

export default TimeField;
