import { createStyles, PasswordInput, TextInput } from '@mantine/core';
import React from 'react';
import { IInput } from '../../../../typings/dialog';
import { UseFormRegisterReturn } from 'react-hook-form';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  register: UseFormRegisterReturn;
  row: IInput;
  index: number;
}

const useStyles = createStyles((theme) => ({
  eyeIcon: {
    color: theme.colors.dark[3],
    '&:hover': {
      color: theme.colors.dark[0],
    },
  },
  lockIcon: {
    color: theme.colors[theme.primaryColor][5],
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
}));

const InputField: React.FC<Props> = (props) => {
  const { classes } = useStyles();
  return (
    <>
      {!props.row.password ? (
        <TextInput
          {...props.register}
          defaultValue={props.row.default}
          label={props.row.label}
          description={props.row.description}
          icon={props.row.icon && <LibIcon className={classes.lockIcon} icon={props.row.icon} fixedWidth />}
          placeholder={props.row.placeholder}
          minLength={props.row.min}
          maxLength={props.row.max}
          disabled={props.row.disabled}
          withAsterisk={props.row.required}
          classNames={{
            label: classes.label,
            description: classes.description,
            input: classes.input,
          }}
        />
      ) : (
        <PasswordInput
          {...props.register}
          defaultValue={props.row.default}
          label={props.row.label}
          description={props.row.description}
          icon={props.row.icon && <LibIcon className={classes.lockIcon} icon={props.row.icon} fixedWidth />}
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
              className={classes.eyeIcon}
              fixedWidth
            />
          )}
          classNames={{
            label: classes.label,
            description: classes.description,
            input: classes.input,
          }}
        />
      )}
    </>
  );
};

export default InputField;
