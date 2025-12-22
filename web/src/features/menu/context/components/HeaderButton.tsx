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
    flex: '1 15%',
    height: 'auto',
    alignSelf: 'stretch',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    padding: 0,
    background: params.canClose === false ? theme.colors[theme.primaryColor][0] + '1A' : theme.colors[theme.primaryColor][9] + '1A',
    border: '1px solid ' + theme.colors[theme.primaryColor][0] + '33',
    '&:hover': {
      background: theme.colors[theme.primaryColor][0],
    }
  },
  root: {
    border: 'none',
    height: '100%',
  },
  label: {
    width: '100%',
    height: '100%',
    display: params.canClose === true ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    color: params.canClose === false ? theme.colors[theme.primaryColor][0] : theme.colors[theme.primaryColor][0],
    '&:hover': {
      color: theme.colors[theme.primaryColor][9],
    }
  },
}));

const HeaderButton: React.FC<Props> = ({ icon, canClose, iconSize, handleClick }) => {
  const { classes } = useStyles({ canClose });

  return (
    <Button
      variant="default"
      className={classes.button}
      classNames={{ label: classes.label, root: classes.root }}
      disabled={canClose === false}
      onClick={handleClick}
    >
      <LibIcon icon={icon} fontSize={iconSize} fixedWidth />
    </Button>
  );
};

export default HeaderButton;
