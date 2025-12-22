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
    background: theme.colors[theme.primaryColor][0] + 'E6',
    color: theme.colors[theme.primaryColor][9],
    border: 'none',
  },
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
  },
  datestyle: {
    color: theme.colors[theme.primaryColor][9],
    '&:hover': {
      background: theme.colors[theme.primaryColor][0],
    },
    '&[data-selected]': {
      background: theme.colors[theme.primaryColor][9],
    }
  },
  weekday: {
    color: theme.colors[theme.primaryColor][9],
  },
  monthpicker: {
    color: theme.colors[theme.primaryColor][9],
    '&:hover': {
      background: theme.colors[theme.primaryColor][0],
    },
    '&[data-selected]': {
      background: theme.colors[theme.primaryColor][9],
    }
  },
  monthactive: {
    background: theme.colors[theme.primaryColor][9],
    '&:hover': {
      background: theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][9],
    },
  },
  yearpicker: {
    color: theme.colors[theme.primaryColor][9],
    '&:hover': {
      background: theme.colors[theme.primaryColor][0],
    },
    '&[data-selected]': {
      background: theme.colors[theme.primaryColor][9],
    }
  },
  yearactive: {
    background: theme.colors[theme.primaryColor][9],
    '&:hover': {
      background: theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][9],
    },
  },
  calheader: {
    marginLeft: 4,
    marginRight: 4,
    background: theme.colors[theme.primaryColor][9],
    color: theme.colors[theme.primaryColor][0],
    '&:hover': {
      background: theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][9],
    },
  },
  calicon: {
    background: theme.colors[theme.primaryColor][9],
    color: theme.colors[theme.primaryColor][0],
    '&:hover': {
      background: theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][9],
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
            calendarHeaderControl: classes.calicon,
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
