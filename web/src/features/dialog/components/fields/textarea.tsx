import { Textarea, useMantineTheme } from '@mantine/core';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ITextarea } from '../../../../typings/dialog';
import React from 'react';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  register: UseFormRegisterReturn;
  row: ITextarea;
  index: number;
}

const TextareaField: React.FC<Props> = (props) => {
  const theme = useMantineTheme();
  return (
    <Textarea
      {...props.register}
      defaultValue={props.row.default}
      label={props.row.label}
      description={props.row.description}
      icon={props.row.icon && <LibIcon icon={props.row.icon} fixedWidth />}
      placeholder={props.row.placeholder}
      disabled={props.row.disabled}
      withAsterisk={props.row.required}
      autosize={props.row.autosize}
      minRows={props.row.min}
      maxRows={props.row.max}
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
  );
};

export default TextareaField;
