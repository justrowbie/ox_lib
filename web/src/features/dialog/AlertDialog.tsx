import { Box, Button, createStyles, Group, Modal, Stack, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import { useLocales } from '../../providers/LocaleProvider';
import remarkGfm from 'remark-gfm';
import type { AlertProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import SlideTransitionRight from '../../transitions/SlideTransitionRight';
import React from 'react';

const useStyles = createStyles((theme) => ({
  contentStack: {
    color: theme.colors[theme.primaryColor][0],
  },
  background: {
    width: '100%',
    height: '100vh',
    background: `linear-gradient(to right,`+ theme.colors.dark[9] +`00 50%,`+ theme.colors.dark[9] +`E6 100%)`,
  },
  modal: {
    background: theme.colors.dark[9] + 'CC',
    border: '1px solid ' + theme.colors.dark[9] + 'CC',
    borderRadius: '1px',
    left: '60vh',
    width: '50vh',
    transform: "perspective(1000px) rotateY(-12deg)"
  },
  modalTitle: {
    width: '100%',
    padding: '5px 10px',
    fontSize: 16,
    fontWeight: 500,
    color: theme.colors.dark[9],
    textAlign: 'center',
    background: theme.colors.gray[0],
  },
  buttonsubmit: {
    color: theme.colors.gray[0],
    background: theme.colors.green[8] + 'CC',
    border: '1px solid ' + theme.colors.green[8] + 'CC',
    borderRadius: '1px',
    '&:hover': {
      background: theme.colors.green[6] + 'E6',
      border: '1px solid ' + theme.colors.green[6] + 'E6',
    },
  },
  buttoncancel: {
    color: theme.colors.gray[0],
    background: theme.colors.red[8] + 'CC',
    border: '1px solid ' + theme.colors.red[8] + 'CC',
    borderRadius: '1px',
    '&:hover': {
      background: theme.colors.red[6] + 'E6',
      border: '1px solid ' + theme.colors.red[6] + 'E6',
    },
  },
}));

const AlertDialog: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
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
    setVisible(false);
    fetchNui('closeAlert', button);
  };

  useNuiEvent('sendAlert', (data: AlertProps) => {
    setDialogData(data);
    setVisible(true);
    setOpened(true);
  });

  useNuiEvent('closeAlertDialog', () => {
    setVisible(false);
    setOpened(false);
  });

  return (
    <>
      {/* <SlideTransitionRight visible={visible}>
        <Box className={classes.background}/>
      </SlideTransitionRight> */}
      <Modal
        opened={opened}
        centered={dialogData.centered}
        size={dialogData.size || 'xl'}
        overflow={dialogData.overflow ? 'inside' : 'outside'}
        closeOnClickOutside={false}
        onClose={() => {
          setOpened(false);
          closeAlert('cancel');
        }}
        withCloseButton={false}
        overlayOpacity={0.5}
        transition="fade"
        exitTransitionDuration={150}
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
              <Button
                uppercase
                variant="default"
                onClick={() => closeAlert('cancel')} mr={3}
                className={classes.buttoncancel}
              >
                {dialogData.labels?.cancel || locale.ui.cancel}
              </Button>
            )}
            <Button
              uppercase
              variant={dialogData.cancel ? 'light' : 'default'}
              color={dialogData.cancel ? theme.primaryColor : undefined}
              onClick={() => closeAlert('confirm')}
              className={classes.buttonsubmit}
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
