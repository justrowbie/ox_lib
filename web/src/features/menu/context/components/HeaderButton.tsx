import { Button, createStyles } from '@mantine/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  icon: IconProp;
  canClose?: boolean;
  iconSize: number;
  handleClick: () => void;
}

const useStyles = createStyles((theme, params: { canClose?: boolean }) => ({
  button: {
    borderRadius: 4,
    flex: '1 15%',
    alignSelf: 'stretch',
    height: 'auto',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 2,
    backgroundColor: theme.colors.dark[5] + 'E6',
    border: '1px solid ' + theme.colors[theme.primaryColor][5],
    boxShadow: theme.colors[theme.primaryColor][5] + ' 0 0 5px 1px',
    color: theme.colors[theme.primaryColor][5],
    textShadow: '0 0 10px' + theme.colors[theme.primaryColor][5],
    '&:hover': {
      backgroundColor: theme.colors[theme.primaryColor][5],
      color: theme.colors.dark[5]
    },
  },
  root: {
    border: 'none',
  },
}));

const HeaderButton: React.FC<Props> = ({ icon, canClose, iconSize, handleClick }) => {
  const { classes } = useStyles({ canClose });

  return (
    <Button
      variant="default"
      className={classes.button}
      classNames={{ root: classes.root }}
      disabled={canClose === false}
      onClick={handleClick}
    >
      <LibIcon icon={icon} fontSize={iconSize} fixedWidth />
    </Button>
  );
};

export default HeaderButton;
