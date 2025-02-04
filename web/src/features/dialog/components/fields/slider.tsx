import { createStyles, Box, Slider, Text, useMantineTheme } from '@mantine/core';
import { ISlider } from '../../../../typings/dialog';
import { Control, useController } from 'react-hook-form';
import { FormValues } from '../../InputDialog';

interface Props {
  row: ISlider;
  index: number;
  control: Control<FormValues>;
}
const useStyles = createStyles((theme) => ({
  markLabel:{
    color: theme.colors.gray[0]
  },
  label: {
    color: theme.colors.gray[0],
    fontWeight: 800,
    backgroundColor: theme.colors[theme.primaryColor][8]
  }
}));

const SliderField: React.FC<Props> = (props) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    defaultValue: props.row.default || props.row.min || 0,
  });

  return (
    <Box>
      <Text 
        sx={{ fontSize: 12, fontWeight: 500, color: theme.colors.gray[0] }}
      >{props.row.label}</Text>
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
        radius='xs'
        marks={[
          { value: props.row.min || 0, label: props.row.min || 0 },
          { value: props.row.max || 100, label: props.row.max || 100 },
        ]}
        classNames={{
          markLabel: classes.markLabel,
          label: classes.label
        }}
      />
    </Box>
  );
};

export default SliderField;
