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
    border: '1px solid ' + theme.colors[theme.primaryColor][0],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  controlContainer: {
    height: 'fit-content',
    width: 'fit-content', 
    position: 'relative',
    display: 'flex',
    gap: 5,
    padding: 5,
    flexDirection: 'row',
    alignItems: params.position?.startsWith('right') ? 'right'
      : params.position?.startsWith('left') ? 'left' : 'center',
    alignContent: params.position?.startsWith('right') ? 'right'
      : params.position?.startsWith('left') ? 'left' : 'center',
    justifyContent: params.position?.startsWith('right') ? 'right'
      : params.position?.startsWith('left') ? 'left' : 'center',
    // border: '1px solid ' + theme.colors[theme.primaryColor][0],
  },
  text: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    width: 'fit-content',
    height: 30,
    background: theme.colors[theme.primaryColor][9],
    fontFamily: 'Roboto',
    color: theme.colors[theme.primaryColor][0],
    fontSize: 15,
  },
  control: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    width: 30,
    height: 30,
    fontFamily: 'Roboto',
    fontWeight: 800,
    fontSize: 18,
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
  const { classes } = useStyles({});
  const [textUis, setTextUis] = React.useState<{ id: number; data: TextUiProps; visible: boolean }[]>([]);

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