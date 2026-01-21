import React from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { Box, createStyles, Group } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import ScaleFade from '../../transitions/ScaleFade';
import remarkGfm from 'remark-gfm';
import type { TextUiPosition, TextUiProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import LibIcon from '../../components/LibIcon';

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
  container: {
    fontSize: 12,
    minHeight: 30,
    padding: 5,
    margin: 5,
    background: theme.colors[theme.primaryColor][9] + 'CC',
    color: theme.colors[theme.primaryColor][0],
    fontFamily: 'Roboto',
  },
  control: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    padding: 5,
    height: 30,
    minWidth: 30,
    background: theme.colors[theme.primaryColor][0],
    color: theme.colors[theme.primaryColor][9],
    fontFamily: 'Roboto',
    fontWeight: 600,
    textTransform: 'uppercase'
  },
}));

interface TextUiItem extends TextUiProps {
  id: string;
}

const TextUI: React.FC = () => {
  const [items, setItems] = React.useState<TextUiItem[]>([]);

  useNuiEvent<TextUiProps>('textUi', (data) => {
    if (!data.position) data.position = 'right-center';
    
    const id = data.control || `${data.text}-${Date.now()}`;
    
    setItems((prev) => {
      const exists = prev.find((item) => item.id === id);
      if (exists) {
        return prev.map((item) => (item.id === id ? { ...data, id } : item));
      }
      return [...prev, { ...data, id }];
    });
  });

  useNuiEvent<{ id?: string }>('textUiHide', (data) => {
    if (data?.id) {
      setItems((prev) => prev.filter((item) => item.id !== data.id));
    } else {
      setItems([]);
    }
  });

  const groupedItems = React.useMemo(() => {
    const groups: Record<TextUiPosition, TextUiItem[]> = {
      'top-center': [],
      'bottom-center': [],
      'right-center': [],
      'left-center': [],
    };

    items.forEach((item) => {
      const position = item.position || 'right-center';
      groups[position].push(item);
    });

    return groups;
  }, [items]);

  return (
    <>
      {(Object.keys(groupedItems) as TextUiPosition[]).map((position) => {
        const positionItems = groupedItems[position];
        if (positionItems.length === 0) return null;

        return <PositionGroup key={position} position={position} items={positionItems} />;
      })}
    </>
  );
};

const PositionGroup: React.FC<{ position: TextUiPosition; items: TextUiItem[] }> = ({
  position,
  items,
}) => {
  const { classes } = useStyles({ position });

  return (
    <Box className={classes.wrapper}>
      {items.map((item) => (
        <ScaleFade key={item.id} visible={true}>
          <Box style={item.style} className={classes.container}>
            <Group spacing={12}>
              {item.control && (
                <Box className={classes.control}>{item.control}</Box>
              )}
              <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
                {item.text}
              </ReactMarkdown>
              {item.icon && (
                <LibIcon
                  icon={item.icon}
                  fixedWidth
                  size="lg"
                  animation={item.iconAnimation}
                  style={{
                    color: item.iconColor,
                    alignSelf: !item.alignIcon || item.alignIcon === 'center' ? 'center' : 'start',
                  }}
                />
              )}
            </Group>
          </Box>
        </ScaleFade>
      ))}
    </Box>
  );
};

export default TextUI;