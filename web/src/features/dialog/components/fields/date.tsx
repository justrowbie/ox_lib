import { IDateInput } from '../../../../typings/dialog';
import { Control, useController } from 'react-hook-form';
import { FormValues } from '../../InputDialog';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import LibIcon from '../../../../components/LibIcon';
import { createStyles } from '@mantine/core';
import { YearPicker } from '@mantine/dates/lib/components/CalendarBase/YearPicker/YearPicker';

interface Props {
  row: IDateInput;
  index: number;
  control: Control<FormValues>;
}

const useStyles = createStyles((theme) => ({
  dropdown: {
    background: theme.colors.dark[9],
    color: theme.colors.dark[0],
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
  datestyle: {
    color: theme.colors.dark[0],
    '&:hover': {
      background: theme.colors.dark[0],
      color: theme.colors.dark[9],
    },
    '&[data-selected]': {
      background: theme.colors.dark[0],
      color: theme.colors.dark[9],
    }
  },
  weekday: {
    color: theme.colors.dark[0],
  },
  monthpicker: {
    color: theme.colors.dark[0],
    '&:hover': {
      background: theme.colors.dark[0],
      color: theme.colors.dark[9],
    },
  },
  monthactive: {
    background: theme.colors.dark[0],
    color: theme.colors.dark[9],
    '&:hover': {
      background: theme.colors.dark[0],
      color: theme.colors.dark[9],
    },
  },
  yearpicker: {
    color: theme.colors.dark[0],
    '&:hover': {
      background: theme.colors.dark[0],
      color: theme.colors.dark[9],
    },
  },
  yearactive: {
    color: theme.colors.dark[9],
    '&:hover': {
      background: theme.colors.dark[0],
      color: theme.colors.dark[9],
    },
  },
  calheader: {
    marginLeft: 4,
    marginRight: 4,
    background: theme.colors.dark[0],
    color: theme.colors.dark[9],
    cursor: 'pointer',
    '&:hover': {
      background: theme.colors.dark[0],
      color: theme.colors.dark[9],
    },
  },
  calicon: {
    background: theme.colors.dark[0],
    color: theme.colors.dark[9],
    cursor: 'pointer',
    '&:hover': {
      background: theme.colors.dark[0],
      color: theme.colors.dark[9],
    },
  }
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
            dropdown: classes.dropdown,
            day: classes.datestyle,
            weekday: classes.weekday,
            monthPickerControlActive: classes.monthactive,
            monthPickerControl: classes.monthpicker,
            yearPickerControlActive: classes.yearactive,
            yearPickerControl: classes.yearpicker,
            calendarHeaderLevel: classes.calheader,
            calendarHeaderControl: classes.calicon
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
            dropdown: classes.dropdown,
            day: classes.datestyle,
            weekday: classes.weekday,
            monthPickerControlActive: classes.monthactive,
            monthPickerControl: classes.monthpicker,
            yearPickerControlActive: classes.yearactive,
            yearPickerControl: classes.yearpicker,
            calendarHeaderLevel: classes.calheader,
            calendarHeaderControl: classes.calicon,
          }}
        />
      )}
    </>
  );
};

export default DateField;
