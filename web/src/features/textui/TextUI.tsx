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
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    left: params.position === 'left-center' ? '1vh' : params.position === 'right-center' ? '-1vh' : 0,
    top: params.position === 'top-center' ? '1vh' : params.position === 'bottom-center' ? '90vh' : '45vh',
    alignItems: 
      params.position === 'top-center' ? 'center' :
      params.position === 'bottom-center' ? 'center' :
      params.position === 'left-center' ? 'flex-start' : 
      'flex-end',
    justifyContent:
      params.position === 'right-center' ? 'flex-end' :
      params.position === 'left-center' ? 'flex-start' :
      'center',
    zIndex: 10000,
    fontFamily: 'Roboto',
    lineHeight: 'normal',
  },
  container: {
    width: 'fit-content',
    fontSize: 14,
    fontWeight: 500,
    padding: 9,
    margin: '4px',
    backgroundColor: theme.colors.dark[6] + 'E6',
    color: theme.colors.gray[0],
  },
  buttonContainer: {
    color: theme.colors.gray[0],
    boxShadow: theme.colors.gray[3],
  },
  button: {
    backgroundColor: theme.colors[theme.primaryColor][8] + 'CC',
    boxShadow: theme.colors[theme.primaryColor][8] + ' 0 0 5px 1px',
    border: '2px solid ' + theme.colors[theme.primaryColor][6],
    opacity: 0.8,
    color: theme.colors.gray[0],
    padding: '6px 12px 6px 12px',
    textAlign:'center',
    fontSize: 16,
    fontWeight: 800,
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
          {data.button && (
            <div className={classes.buttonContainer}>
              <span className={classes.button}>{data.button}</span>
            </div>
          )}
          <Box style={data.style} className={classes.container}>
            <Group spacing={12}>
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