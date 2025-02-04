import { BackgroundImage, MultiSelect, Select, useMantineTheme } from '@mantine/core';
import { ISelect } from '../../../../typings';
import { Control, useController } from 'react-hook-form';
import { FormValues } from '../../InputDialog';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  row: ISelect;
  index: number;
  control: Control<FormValues>;
}

const SelectField: React.FC<Props> = (props) => {
  const theme = useMantineTheme();
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    rules: { required: props.row.required },
  });

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
          styles={{
            input:{
              backgroundColor: 'transparent',
              borderColor: theme.colors.gray[6]
            },
            label:{
              color: theme.colors.gray[0],
            },
            description:{
              color: theme.colors.gray[4],
            },
            dropdown:{
              backgroundColor: theme.colors[theme.primaryColor][8],
              opacity: 0.95
            },
            item:{
              color: theme.colors.gray[0],
              '&[data-hovered]':{
                backgroundColor: theme.colors[theme.primaryColor][9],
              },
              '&[data-selected]': {
                '&, &:hover': {
                  backgroundColor: theme.colors[theme.primaryColor][8],
                  color: theme.colors.gray[0],
                },
              },
            }
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
              styles={{
                input:{
                  backgroundColor: 'transparent',
                  borderColor: theme.colors.gray[6]
                },
                label:{
                  color: theme.colors.gray[0],
                },
                description:{
                  color: theme.colors.gray[4],
                }
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default SelectField;
