import { PasswordInput, TextInput, useMantineTheme } from '@mantine/core';
import React from 'react';
import { IInput } from '../../../../typings/dialog';
import { UseFormRegisterReturn } from 'react-hook-form';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  register: UseFormRegisterReturn;
  row: IInput;
  index: number;
}

const InputField: React.FC<Props> = (props) => {
  const theme = useMantineTheme();

  return (
    <>
      {!props.row.password ? (
        <TextInput
          {...props.register}
          defaultValue={props.row.default}
          label={props.row.label}
          description={props.row.description}
          icon={props.row.icon && <LibIcon icon={props.row.icon} fixedWidth />}
          placeholder={props.row.placeholder}
          minLength={props.row.min}
          maxLength={props.row.max}
          disabled={props.row.disabled}
          withAsterisk={props.row.required}
          styles={{
            input:{
              backgroundColor: 'transparent',
              borderColor: theme.colors.gray[6],
            },
            label:{
              color: theme.colors.gray[0],
            },
            description:{
              color: theme.colors.gray[4],
            }
          }}
        />
      ) : (
        <PasswordInput
          {...props.register}
          defaultValue={props.row.default}
          label={props.row.label}
          description={props.row.description}
          icon={props.row.icon && <LibIcon icon={props.row.icon} fixedWidth />}
          placeholder={props.row.placeholder}
          minLength={props.row.min}
          maxLength={props.row.max}
          disabled={props.row.disabled}
          withAsterisk={props.row.required}
          visibilityToggleIcon={({ reveal, size }) => (
            <LibIcon
              icon={reveal ? 'eye-slash' : 'eye'}
              fontSize={size}
              cursor="pointer"
              fixedWidth
            />
          )}
          styles={{
            input:{
              backgroundColor: 'transparent',
              borderColor: theme.colors.gray[6],
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
  );
};

export default InputField;
