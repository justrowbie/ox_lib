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
  thumb: {
    background: theme.colors[theme.primaryColor][0],
  },
  thumbLabel: {
    fontWeight: 800,
    fontSize: '12px',
    color: theme.colors[theme.primaryColor][9],
    background: theme.colors[theme.primaryColor][0],
  },
  markLabel:{
    color: theme.colors[theme.primaryColor][0]
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
            background: theme.colors[theme.primaryColor][0] + '1A',
            border: '1px solid ' + theme.colors[theme.primaryColor][0] + '33',
          },
          '.mantine-Slider-track::after': {
            background: theme.colors[theme.primaryColor][0] + 'E9',
            border: '1px solid ' + theme.colors[theme.primaryColor][0] + '33',
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
