import { ActionIcon, Button, Divider, Drawer, Stack, Tooltip, useMantineTheme } from '@mantine/core';
import { debugAlert } from './debug/alert';
import { debugContext } from './debug/context';
import { debugInput } from './debug/input';
import { debugMenu } from './debug/menu';
import { debugCustomNotification } from './debug/notification';
import { debugCircleProgressbar, debugProgressbar } from './debug/progress';
import { debugTextUI } from './debug/textui';
import { debugSkillCheck } from './debug/skillcheck';
import { useState } from 'react';
import { debugRadial } from './debug/radial';
import LibIcon from '../../components/LibIcon';

const Dev: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <>
      <Tooltip label="Developer drawer" position="bottom">
        <ActionIcon
          onClick={() => setOpened(true)}
          radius="xl"
          variant="filled"
          color={theme.colors.gray[0]}
          sx={{ position: 'absolute', bottom: 0, right: 0, width: 50, height: 50 }}
          size="xl"
          mr={50}
          mb={50}
        >
          <LibIcon icon="wrench" fontSize={24} color={theme.colors.gray[9]} />
        </ActionIcon>
      </Tooltip>

      <Drawer position="left" onClose={() => setOpened(false)} opened={opened} title="Developer drawer" padding="xl">
        <Stack>
          <Divider />
          <Button fullWidth color="gray.0" sx={{ color: theme.colors.gray[9] }} onClick={() => debugInput()}>
            Open input dialog
          </Button>
          <Button fullWidth color="gray.0" sx={{ color: theme.colors.gray[9] }} onClick={() => debugAlert()}>
            Open alert dialog
          </Button>
          <Divider />
          <Button fullWidth color="gray.0" sx={{ color: theme.colors.gray[9] }} onClick={() => debugContext()}>
            Open context menu
          </Button>
          <Button fullWidth color="gray.0" sx={{ color: theme.colors.gray[9] }} onClick={() => debugMenu()}>
            Open list menu
          </Button>
          <Button fullWidth color="gray.0" sx={{ color: theme.colors.gray[9] }} onClick={() => debugRadial()}>
            Open radial menu
          </Button>
          <Divider />
          <Button fullWidth color="gray.0" sx={{ color: theme.colors.gray[9] }} onClick={() => debugCustomNotification()}>
            Send notification
          </Button>
          <Divider />
          <Button fullWidth color="gray.0" sx={{ color: theme.colors.gray[9] }} onClick={() => debugProgressbar()}>
            Activate progress bar
          </Button>
          <Button fullWidth color="gray.0" sx={{ color: theme.colors.gray[9] }} onClick={() => debugCircleProgressbar()}>
            Activate progress circle
          </Button>
          <Divider />
          <Button fullWidth color="gray.0" sx={{ color: theme.colors.gray[9] }} onClick={() => debugTextUI()}>
            Show TextUI
          </Button>
          <Divider />
          <Button fullWidth color="gray.0" sx={{ color: theme.colors.gray[9] }} onClick={() => debugSkillCheck()}>
            Run skill check
          </Button>
        </Stack>
      </Drawer>
    </>
  );
};

export default Dev;
