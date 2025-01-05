import { Button, Box, createStyles, Group, Modal, Stack, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import { useLocales } from '../../providers/LocaleProvider';
import remarkGfm from 'remark-gfm';
import type { AlertProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import SlideTransition from '../../transitions/SlideTransition';

const useStyles = createStyles((theme) => ({
  background: {
    width: '100%',
    height: '100vh'
  },
  contentStack: {
    color: theme.colors.dark[0],
  },
  buttonsubmit: {
    backgroundColor: theme.colors.green[6],
    '&:hover': {
      backgroundColor: theme.colors.green[9]
    },
  },
  buttoncancel: {
    backgroundColor: theme.colors.red[6],
    '&:hover': {
      backgroundColor: theme.colors.red[9]
    },
  },
}));

const AlertDialog: React.FC = () => {
  const { locale } = useLocales();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [dialogData, setDialogData] = useState<AlertProps>({
    header: '',
    content: '',
  });

  const closeAlert = (button: string) => {
    setOpened(false);
    fetchNui('closeAlert', button);
  };

  useNuiEvent('sendAlert', (data: AlertProps) => {
    setDialogData(data);
    setOpened(true);
  });

  useNuiEvent('closeAlertDialog', () => {
    setOpened(false);
  });

  return (
    <>
      <SlideTransition visible={opened}>
        <Box
          className={classes.background}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(16, 17, 19, 0.0) 0%, rgba(16, 17, 19, 0.8) 80%)`,
          }}
        />
      </SlideTransition>
      <Modal
        className='alert-dialog'
        opened={opened}
        centered={dialogData.centered}
        size={dialogData.size || 'sm'}
        overflow={dialogData.overflow ? 'inside' : 'outside'}
        closeOnClickOutside={false}
        onClose={() => {
          setOpened(false);
          closeAlert('cancel');
        }}
        withCloseButton={false}
        overlayOpacity={0}
        exitTransitionDuration={150}
        transition="fade"
        styles={{
          modal: {
            backgroundColor: 'rgba(16, 17, 19, 0.6)',
            borderRadius: '10px',
            left: '70vh',
            maxWidth: '400px',
            maxHeight: '600px',
            transform: "perspective(1000px) rotateY(-12deg)"
          },
          title: { 
            width: '100%',
            color: theme.colors.gray[1],
            fontSize: 16,
            fontWeight: 500,
          }
        }}
        title={<ReactMarkdown components={MarkdownComponents}>{dialogData.header}</ReactMarkdown>}
      >
        <Stack className={classes.contentStack}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              ...MarkdownComponents,
              img: ({ ...props }) => <img style={{ maxWidth: '100%', maxHeight: '100%' }} {...props} />,
            }}
          >
            {dialogData.content}
          </ReactMarkdown>
          <Group position="right" spacing={10}>
            {dialogData.cancel && (
              <Button className={classes.buttoncancel} uppercase onClick={() => closeAlert('cancel')} mr={3}>
                {dialogData.labels?.cancel || locale.ui.cancel}
              </Button>
            )}
            <Button
              className={classes.buttonsubmit}
              uppercase
              onClick={() => closeAlert('confirm')}
            >
              {dialogData.labels?.confirm || locale.ui.confirm}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default AlertDialog;
