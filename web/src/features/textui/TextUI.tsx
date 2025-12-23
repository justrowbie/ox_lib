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
    position: 'relative',
    display: 'flex',
    alignItems: params.position?.startsWith('right') ? 'right'
      : params.position?.startsWith('left') ? 'left' : 'center',
    alignContent: params.position?.startsWith('right') ? 'right'
      : params.position?.startsWith('left') ? 'left' : 'center',
    justifyContent: params.position?.startsWith('right') ? 'right'
      : params.position?.startsWith('left') ? 'left' : 'center',
    top: params.position?.startsWith('top') ? -120 : 0,
    border: '1px solid ' + theme.colors[theme.primaryColor][0] + '33',
  },
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    width: 'fit-content',
    height: 30,
    background: theme.colors[theme.primaryColor][9],
    fontFamily: 'Roboto',
    color: theme.colors[theme.primaryColor][0],
    fontSize: 15,
  },
  controlcontainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    <Box className={classes.wrapper}>
      <ScaleFade visible={visible}>
        <Flex direction={'row'} align={'center'} gap={5}>
          {data.control && (
            <div className={classes.controlcontainer}>
              <span className={classes.control}>{data.control}</span>
            </div>
          )}
          <Box style={data.style} className={classes.container}>
            <Group spacing={5}>
              <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
                {data.text}
              </ReactMarkdown>
            </Group>
          </Box>
        </Flex>
      </ScaleFade>
    </Box>
  );
};

const TextUIContainer: React.FC = () => {
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
    <Flex direction={'column'} gap={5}>
      {textUis.map(({ id, data, visible }) => (
        <TextUI key={id} data={data} visible={visible} onHidden={() => handleHidden(id)} />
      ))}
    </Flex>
  );
};

export default TextUIContainer;