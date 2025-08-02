import { Box, Global, Slider, Text, createStyles } from '@mantine/core';
import { ISlider } from '../../../../typings/dialog';
import { Control, useController } from 'react-hook-form';
import { FormValues } from '../../InputDialog';

interface Props {
  row: ISlider;
  index: number;
  control: Control<FormValues>;
}

const useStyles = createStyles((theme) => ({
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
  thumb: {
    backgroundColor: theme.colors[theme.primaryColor][6],
    border: `2px solid `+theme.colors[theme.primaryColor][5],
  },
  thumbLabel: {
    fontWeight: 600,
    fontSize: '12px',
    color: theme.colors.gray[0],
    backgroundColor: theme.colors[theme.primaryColor][5] + '80',
    border: `1px solid `+theme.colors[theme.primaryColor][5] + 'CC',
  },
  markLabel:{
    color: theme.colors.gray[0]
  },
}))

const SliderField: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    defaultValue: props.row.default || props.row.min || 0,
  });
  const { classes } = useStyles();
  return (
    <>
      <Global
        styles={(theme) => ({
          '.mantine-Slider-track::before': {
            backgroundColor: theme.colors.dark[3] + 'E9',
          },
          '.mantine-Slider-track::after': {
            backgroundColor: theme.colors.dark[3] + 'E9',
          },
        })}
      />
      <Box>
        <Text className={classes.label}>{props.row.label}</Text>
        <Slider
          mb={10}
          value={controller.field.value}
          name={controller.field.name}
          ref={controller.field.ref}
          onBlur={controller.field.onBlur}
          onChange={controller.field.onChange}
          defaultValue={props.row.default || props.row.min || 0}
          min={props.row.min}
          max={props.row.max}
          step={props.row.step}
          disabled={props.row.disabled}
          marks={[
            { value: props.row.min || 0, label: props.row.min || 0 },
            { value: props.row.max || 100, label: props.row.max || 100 },
          ]}
          classNames={{
            thumb: classes.thumb,
            label: classes.thumbLabel,
            markLabel: classes.markLabel
          }}
        />
      </Box>
    </>
  );
};

export default SliderField;
