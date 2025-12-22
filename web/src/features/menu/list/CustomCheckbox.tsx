import { Checkbox, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    background: theme.colors[theme.primaryColor][9] + '1A',
    border: '1px solid ' + theme.colors[theme.primaryColor][0] + '33',
    '&:checked': { 
      background: theme.colors[theme.primaryColor][0],
    },
  },
  inner: {
    '> svg > path': {
      fill: theme.colors[theme.primaryColor][9],
    },
  },
}));

const CustomCheckbox: React.FC<{ checked: boolean }> = ({ checked }) => {
  const { classes } = useStyles();
  return (
    <Checkbox
      checked={checked}
      size="md"
      classNames={{ 
        root: classes.root, 
        input: `${classes.input} checkboxInput`, 
        inner: `${classes.inner} checkboxInner` }}
    />
  );
};

export default CustomCheckbox;
