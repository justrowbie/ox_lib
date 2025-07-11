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
    height: '100vh',
    backgroundImage: `linear-gradient(to right,`+ theme.colors.dark[9] +`00 0%,`+ theme.colors.dark[9] +`E6 80%)`,
  },
  contentStack: {
    color: theme.colors.gray[0],
    textAlign: 'justify',
  },
  modal: {
    border: '1px solid ' + theme.colors.gray[0] + '66',
    backgroundColor: theme.colors.gray[0] + '1A',
    backdropFilter: 'blur(8px)',
    borderRadius: '2px',
    left: '70vh',
    maxWidth: '400px',
    maxHeight: '600px',
    transform: "perspective(1000px) rotateY(-12deg)"
  },
  modalTitle: { 
    width: '100%',
    fontSize: 16,
    fontWeight: 500,
    color: theme.colors[theme.primaryColor][5],
    textAlign: 'center',
    textShadow: '0 0 10px' + theme.colors[theme.primaryColor][5],
    borderBottom: '2px solid ' + theme.colors[theme.primaryColor][5],
  },
  buttonsubmit: {
    color: theme.colors.gray[0],
    backgroundColor: theme.colors[theme.primaryColor][9],
    '&:hover': {
      backgroundColor: theme.colors[theme.primaryColor][5]
    },
  },
  buttoncancel: {
    color: theme.colors.gray[0],
    backgroundColor: theme.colors.red[9],
    '&:hover': {
      backgroundColor: theme.colors.red[5]
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
        classNames={{
          modal: classes.modal,
          title: classes.modalTitle
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
