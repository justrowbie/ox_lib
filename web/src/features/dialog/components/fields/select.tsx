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
    backgroundColor: theme.colors.dark[3] + 'E9',
  },
  item:{
    marginBottom: '.5vh',
    color: theme.colors.gray[0],
    border: `1px solid `+theme.colors.gray[0] + '33',
    '&[data-hovered]':{
      backgroundColor: theme.colors[theme.primaryColor][5] + 'CC',
      borderColor: theme.colors[theme.primaryColor][5] + 'CC',
    },
    '&[data-selected]': {
      '&, &:hover': {
        backgroundColor: theme.colors[theme.primaryColor][5] + '80',
        border: `1px solid `+theme.colors[theme.primaryColor][5] + 'CC',
      },
    },
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
