import React from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { Box, createStyles, Flex, Group } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import ScaleFade from '../../transitions/ScaleFade';
import remarkGfm from 'remark-gfm';
import type { TextUiPosition, TextUiProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';

const useStyles = createStyles((theme, params: { position?: TextUiPosition }) => ({
  wrapper: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    display: 'flex',
    flexDirection: params.position?.startsWith('top')
      || params.position?.startsWith('bottom')
      ? 'row' : 'column',
    alignItems: params.position?.startsWith('right') ? 'flex-end' 
      : params.position?.startsWith('left') ? 'flex-start' : 'center',
    justifyContent: 'center',
    bottom: params.position?.startsWith('top') ? '45%' : undefined,
    top: params.position?.startsWith('bottom') ? '45%' : undefined,
  },
  controlContainer: {
    height: 'fit-content',
    width: 'fit-content', 
    position: 'relative',
    display: 'flex',
    gap: 10,
    padding: 5,
    flexDirection: 'row',
  },
  text: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    width: 'fit-content',
    height: 30,
    fontFamily: 'Roboto',
    fontSize: 14,
    background: theme.colors[theme.primaryColor][9],
    color: theme.colors[theme.primaryColor][0],
  },
  control: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 'fit-content',
    height: 30,
    fontFamily: 'Roboto',
    fontWeight: 800,
    fontSize: 16,
    background: theme.colors[theme.primaryColor][0],
    color: theme.colors[theme.primaryColor][9],
    border: '2px solid ' + theme.colors[theme.primaryColor][9] + '1A',
  },
}));

const TextUI: React.FC<{ data: TextUiProps; visible: boolean; onHidden: () => void }> = ({ data, visible, onHidden }) => {
  const { classes } = useStyles({ position: data.position });

  React.useEffect(() => {
    if (!visible) {
      const timer = setTimeout(onHidden, 300); // Delay to match the fade-out animation duration
      return () => clearTimeout(timer);
    }
  }, [visible, onHidden]);

  return (
      <ScaleFade visible={visible}>
    <Box className={classes.controlContainer}>
        {data.control && (
          <Box className={classes.control}>{data.control}</Box>
        )}
        <Box style={data.style} className={classes.text}>
          <Group spacing={5}>
            <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
              {data.text}
            </ReactMarkdown>
          </Group>
        </Box>
    </Box>
      </ScaleFade>
  );
};

const TextUIContainer: React.FC = () => {
  const [textUis, setTextUis] = React.useState<{ id: number; data: TextUiProps; visible: boolean }[]>([]);
  const { classes } = useStyles({ position: textUis[0]?.data.position });
  
  useNuiEvent<TextUiProps>('textUi', (newData) => {
    if (!newData.position) newData.position = 'right-center';

    setTextUis((current) => [
      ...current,
      { id: Date.now(), data: newData, visible: true },
    ]);
  });

  useNuiEvent('textUiHide', (id?: number) => {
    if (id !== undefined) {
      setTextUis((current) =>
        current.map((ui) => (ui.id === id ? { ...ui, visible: false } : ui))
      );
    } else {
      setTextUis((current) => current.map((ui) => ({ ...ui, visible: false })));
    }
  });

  const handleHidden = (id: number) => {
    setTextUis((current) => current.filter((ui) => ui.id !== id));
  };

  return (
    <Box className={classes.wrapper}>
      {textUis.map(({ id, data, visible }) => (
        <TextUI key={id} data={data} visible={visible} onHidden={() => handleHidden(id)} />
      ))}
    </Box>
  );
};

export default TextUIContainer;