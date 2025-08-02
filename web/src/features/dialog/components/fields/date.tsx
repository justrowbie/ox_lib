import { IDateInput } from '../../../../typings/dialog';
import { Control, useController } from 'react-hook-form';
import { FormValues } from '../../InputDialog';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import LibIcon from '../../../../components/LibIcon';
import { createStyles } from '@mantine/core';

interface Props {
  row: IDateInput;
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

const DateField: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    rules: { required: props.row.required, min: props.row.min, max: props.row.max },
  });
  const { classes } = useStyles();
  return (
    <>
      {props.row.type === 'date' && (
        <DatePicker
          value={controller.field.value ? new Date(controller.field.value) : controller.field.value}
          name={controller.field.name}
          ref={controller.field.ref}
          onBlur={controller.field.onBlur}
          // Workaround to use timestamp instead of Date object in values
          onChange={(date) => controller.field.onChange(date ? date.getTime() : null)}
          label={props.row.label}
          description={props.row.description}
          placeholder={props.row.format}
          disabled={props.row.disabled}
          inputFormat={props.row.format}
          withAsterisk={props.row.required}
          clearable={props.row.clearable}
          icon={props.row.icon && <LibIcon fixedWidth icon={props.row.icon} />}
          minDate={props.row.min ? new Date(props.row.min) : undefined}
          maxDate={props.row.max ? new Date(props.row.max) : undefined}
          classNames={{
            label: classes.label,
            description: classes.description,
            input: classes.input,
            dropdown: classes.dropdown
          }}
        />
      )}
      {props.row.type === 'date-range' && (
        <DateRangePicker
          value={
            controller.field.value
              ? controller.field.value[0]
                ? controller.field.value.map((date: Date) => new Date(date))
                : controller.field.value
              : controller.field.value
          }
          name={controller.field.name}
          ref={controller.field.ref}
          onBlur={controller.field.onBlur}
          onChange={(dates) =>
            controller.field.onChange(dates.map((date: Date | null) => (date ? date.getTime() : null)))
          }
          label={props.row.label}
          description={props.row.description}
          placeholder={props.row.format}
          disabled={props.row.disabled}
          inputFormat={props.row.format}
          withAsterisk={props.row.required}
          clearable={props.row.clearable}
          icon={props.row.icon && <LibIcon fixedWidth icon={props.row.icon} />}
          minDate={props.row.min ? new Date(props.row.min) : undefined}
          maxDate={props.row.max ? new Date(props.row.max) : undefined}
          classNames={{
            label: classes.label,
            description: classes.description,
            input: classes.input,
            dropdown: classes.dropdown
          }}
        />
      )}
    </>
  );
};

export default DateField;
