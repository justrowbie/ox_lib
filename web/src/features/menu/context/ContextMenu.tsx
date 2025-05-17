import { useNuiEvent } from '../../../hooks/useNuiEvent';
import { Box, createStyles, Flex, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ContextMenuProps } from '../../../typings';
import ContextButton from './components/ContextButton';
import { fetchNui } from '../../../utils/fetchNui';
import ReactMarkdown from 'react-markdown';
import HeaderButton from './components/HeaderButton';
import ScaleFade from '../../../transitions/ScaleFade';
import MarkdownComponents from '../../../config/MarkdownComponents';
import SlideTransition from '../../../transitions/SlideTransition';

const openMenu = (id: string | undefined) => {
  fetchNui<ContextMenuProps>('openContext', { id: id, back: true });
};

const useStyles = createStyles((theme) => ({
  background: {
    width: '100%',
    height: '100vh',
    backgroundImage: `linear-gradient(to right,`+ theme.colors[theme.primaryColor][8] +`00 40%,`+ theme.colors[theme.primaryColor][8] +`80 80%)`,
  },
  container: {
    position: 'absolute',
    top: '25%',
    right: '15%',
    width: 320,
    height: 580,
    transform: "perspective(1000px) rotateY(-12deg)"
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    gap: 2,
  },
  titleContainer: {
    flex: '1 85%',
    backgroundColor: theme.colors.dark[5] + 'E6',
    border: '1px solid ' + theme.colors[theme.primaryColor][5],
    boxShadow: theme.colors[theme.primaryColor][5] + ' 0 0 5px 1px'
  },
  titleText: {
    color: theme.colors[theme.primaryColor][5],
    textShadow: '0 0 10px' + theme.colors[theme.primaryColor][5],
    padding: 6,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 600,
  },
  buttonsContainer: {
    height: 560,
    overflowY: 'scroll',
  },
  buttonsFlexWrapper: {
    gap: 6,
  },
}));

const ContextMenu: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuProps>({
    title: '',
    menu:'',
    options: { '': { description: '', metadata: [] } },
  });

  const closeContext = () => {
    if (contextMenu.canClose === false) return;
    setVisible(false);
    fetchNui('closeContext');
  };

  // Hides the context menu on ESC
  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (['Escape'].includes(e.code)) closeContext();
    };

    window.addEventListener('keydown', keyHandler);

    return () => window.removeEventListener('keydown', keyHandler);
  }, [visible]);

  useNuiEvent('hideContext', () => setVisible(false));

  useNuiEvent<ContextMenuProps>('showContext', async (data) => {
    if (visible) {
      setVisible(false);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    setContextMenu(data);
    setVisible(true);
  });

  return (
    <>
      <SlideTransition visible={visible}>
        <Box
          className={classes.background}
        />
      </SlideTransition>
      <Box className={classes.container}>
        <ScaleFade visible={visible}>
          <Flex className={classes.header}>
            {contextMenu.menu && (
              <HeaderButton icon="chevron-left" iconSize={16} handleClick={() => openMenu(contextMenu.menu)} />
            )}
            <Box className={classes.titleContainer}>
              <Text className={classes.titleText}>
                <ReactMarkdown components={MarkdownComponents}>{contextMenu.title}</ReactMarkdown>
              </Text>
            </Box>
            <HeaderButton icon="xmark" canClose={contextMenu.canClose} iconSize={18} handleClick={closeContext} />
          </Flex>
          <Box className={classes.buttonsContainer}>
            <Stack className={classes.buttonsFlexWrapper}>
              {Object.entries(contextMenu.options).map((option, index) => (
                <ContextButton option={option} key={`context-item-${index}`} />
              ))}
            </Stack>
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default ContextMenu;
