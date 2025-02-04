import { Checkbox, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.gray[3],
    '&:checked': { backgroundColor: theme.colors[theme.primaryColor][8] },
  },
  inner: {
    '> svg > path': {
      fill: theme.colors.gray[3],
    },
  },
}));

const CustomCheckbox: React.FC<{ checked: boolean }> = ({ checked }) => {
  const { classes } = useStyles();
  return (
    <Checkbox
      checked={checked}
      size="sm"
      classNames={{ root: classes.root, input: classes.input, inner: classes.inner }}
    />
  );
};

export default CustomCheckbox;
