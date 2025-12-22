import { MultiSelect, Select, createStyles } from '@mantine/core';
import { ISelect } from '../../../../typings';
import { Control, useController } from 'react-hook-form';
import { FormValues } from '../../InputDialog';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  row: ISelect;
  index: number;
  control: Control<FormValues>;
}

const useStyles = createStyles((theme) => ({
  dropdown: {
    background: theme.colors[theme.primaryColor][0] + 'E6',
    border: 'none',
  },
  item:{
    marginBottom: '.4vh',
    color: theme.colors[theme.primaryColor][9],
    background: theme.colors[theme.primaryColor][0] + 'E6',
    '&[data-hovered]':{
      background: theme.colors[theme.primaryColor][9],
      color: theme.colors[theme.primaryColor][0],
    },
    '&[data-selected]': {
      '&, &:hover': {
        background: theme.colors[theme.primaryColor][9],
        color: theme.colors[theme.primaryColor][0],
      },
    },
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
    '&:hover': {
      border: '1px solid ' + theme.colors[theme.primaryColor][0],
    },
  },
}))

const SelectField: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    rules: { required: props.row.required },
  });
  const { classes } = useStyles();
  return (
    <>
      {props.row.type === 'select' ? (
        <Select
          data={props.row.options}
          value={controller.field.value}
          name={controller.field.name}
          ref={controller.field.ref}
          onBlur={controller.field.onBlur}
          onChange={controller.field.onChange}
          disabled={props.row.disabled}
          label={props.row.label}
          description={props.row.description}
          withAsterisk={props.row.required}
          clearable={props.row.clearable}
          searchable={props.row.searchable}
          icon={props.row.icon && <LibIcon icon={props.row.icon} fixedWidth />}
          classNames={{
            label: classes.label,
            description: classes.description,
            input: classes.input,
            dropdown: classes.dropdown,
            item: classes.item
          }}
        />
      ) : (
        <>
          {props.row.type === 'multi-select' && (
            <MultiSelect
              data={props.row.options}
              value={controller.field.value}
              name={controller.field.name}
              ref={controller.field.ref}
              onBlur={controller.field.onBlur}
              onChange={controller.field.onChange}
              disabled={props.row.disabled}
              label={props.row.label}
              description={props.row.description}
              withAsterisk={props.row.required}
              clearable={props.row.clearable}
              searchable={props.row.searchable}
              maxSelectedValues={props.row.maxSelectedValues}
              icon={props.row.icon && <LibIcon icon={props.row.icon} fixedWidth />}
              classNames={{
                label: classes.label,
                description: classes.description,
                input: classes.input,
                dropdown: classes.dropdown,
                item: classes.item
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default SelectField;
