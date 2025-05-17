import { useNuiEvent } from '../../hooks/useNuiEvent';
import { toast, Toaster } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { Box, Center, createStyles, Group, keyframes, RingProgress, Stack, Text, ThemeIcon, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';
import tinycolor from 'tinycolor2';
import type { NotificationProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import LibIcon from '../../components/LibIcon';

const useStyles = createStyles((theme) => ({
  container: {
    width: 300,
    height: 'fit-content',
    background: theme.colors.dark[5] + 'E6',
    color: theme.colors.gray[0],
    padding: 12,
    borderRadius: theme.radius.sm,
    fontFamily: 'Roboto',
    boxShadow: theme.shadows.sm
  },
  title: {
    fontWeight: 500,
    lineHeight: 'normal',
    color: theme.colors[theme.primaryColor][5],
    textShadow: '0 0 10px' + theme.colors[theme.primaryColor][5],
  },
  description: {
    fontSize: 12,
    color: theme.colors.gray[0],
    fontFamily: 'Roboto',
    lineHeight: 'normal',
  },
  descriptionOnly: {
    fontSize: 12,
    color: theme.colors.gray[0],
    fontFamily: 'Roboto',
    lineHeight: 'normal',
  },
}));

const createAnimation = (from: string, to: string, yaw: string, visible: boolean) => keyframes({
  from: {
    opacity: visible ? 0 : 1,
    transform: `translate${from} perspective(1000px) rotateY(${yaw})`,
  },
  to: {
    opacity: visible ? 1 : 0,
    transform: `translate${to} perspective(1000px) rotateY(${yaw})`,
  },
});

const getAnimation = (visible: boolean, position: string) => {
  const animationOptions = visible ? '0.2s ease-out forwards' : '0.4s ease-in forwards';
  let animation: { from: string; to: string; yaw: string };

  if (visible) {
    if (position === 'bottom') {
      animation = { from: 'Y(30px)', to: 'Y(0px)', yaw: '0deg' };
    } else if (position === 'bottom-center') {
      animation = { from: 'Y(30px)', to: 'Y(0px)', yaw: '0deg' };
    } else if (position === 'bottom-left') {
      animation = { from: 'Y(30px)', to: 'Y(0px)', yaw: '25deg' };
    } else if (position === 'bottom-right') {
      animation = { from: 'Y(30px)', to: 'Y(0px)', yaw: '-25deg' };
    } else if (position === 'top') {
      animation = { from: 'Y(-30px)', to:'Y(0px)', yaw: '0deg' };
    } else if (position === 'top-center') {
      animation = { from: 'Y(-30px)', to:'Y(0px)', yaw: '0deg' };
    } else if (position === 'top-left') {
      animation = { from: 'Y(-30px)', to:'Y(0px)', yaw: '25deg' };
    } else if (position === 'top-right') {
      animation = { from: 'Y(-30px)', to:'Y(0px)', yaw: '-25deg' };
    } else if (position === 'center-left') {
      animation = { from: 'Y(-30px)', to:'Y(0px)', yaw: '25deg' };
    } else if (position === 'center-right') {
      animation = { from: 'Y(-30px)', to:'Y(0px)', yaw: '-25deg' };
    } else {
      animation = { from: 'Y(-30px)', to:'Y(0px)', yaw: '0deg' };
    }
  } else {
    if (position === 'bottom') {
      animation = { from: 'Y(0px)', to: 'Y(100%)', yaw: '0deg' };
    } else if (position === 'bottom-center') {
      animation = { from: 'Y(0px)', to: 'Y(100%)', yaw: '0deg' };
    } else if (position === 'bottom-left') {
      animation = { from: 'X(0px)', to: 'X(-100%)', yaw: '25deg' };
    } else if (position === 'bottom-right') {
      animation = { from: 'X(0px)', to: 'X(100%)', yaw: '-25deg' };
    } else if (position === 'top') {
      animation = { from: 'Y(0px)', to: 'Y(-100%)', yaw: '0deg' };
    } else if (position === 'top-center') {
      animation = { from: 'Y(0px)', to: 'Y(-100%)', yaw: '0deg' };
    } else if (position === 'top-left') {
      animation = { from: 'X(0px)', to: 'X(-100%)', yaw: '25deg' };
    } else if (position === 'top-right') {
      animation = { from: 'X(0px)', to: 'X(100%)', yaw: '-25deg' };
    } else if (position === 'center-left') {
      animation = { from: 'X(0px)', to: 'X(-100%)', yaw: '25deg' };
    } else if (position === 'center-right') {
      animation = { from: 'X(0px)', to: 'X(100%)', yaw: '-25deg' };
    } else {
      animation = { from: 'X(0px)', to: 'X(100%)', yaw: '0deg' };
    }
  }

  return `${createAnimation(animation.from, animation.to, animation.yaw, visible)} ${animationOptions}`;
};

const durationCircle = keyframes({
  '0%': { strokeDasharray: `0, ${15.1 * 2 * Math.PI}` },
  '100%': { strokeDasharray: `${15.1 * 2 * Math.PI}, 0` },
});

const Notifications: React.FC = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [toastKey, setToastKey] = useState(0);

  useNuiEvent<NotificationProps>('notify', (data) => {
    if (!data.title && !data.description) return;

    const toastId = data.id?.toString();
    const duration = data.duration || 3000;

    let iconColor: string;
    let boxColor: string;
    let position = data.position || 'top-right';

    data.showDuration = data.showDuration !== undefined ? data.showDuration : true;

    if (toastId) setToastKey(prevKey => prevKey + 1);

    // Backwards compat with old notifications
    switch (position) {
      case 'top':
        position = 'top-center';
        break;
      case 'bottom':
        position = 'bottom-center';
        break;
    }

    if (!data.icon) {
      switch (data.type) {
        case 'error':
          data.icon = 'circle-xmark';
          break;
        case 'success':
          data.icon = 'circle-check';
          break;
        case 'warning':
          data.icon = 'circle-exclamation';
          break;
        default:
          data.icon = 'circle-info';
          break;
      }
    }

    if (!data.iconColor) {
      switch (data.type) {
        case 'error':
          iconColor = theme.colors.red[3];
          break;
        case 'success':
          iconColor = theme.colors.green[3];
          break;
        case 'warning':
          iconColor = theme.colors.yellow[3];
          break;
        default:
          iconColor = theme.colors[theme.primaryColor][5];
          break;
      }
    } else {
      iconColor = tinycolor(data.iconColor).toRgbString();
    }
    
    if (!data.boxColor) {
      switch (data.type) {
        case 'error':
          boxColor = theme.colors.red[9] + 'E6';
          break;
        case 'success':
          boxColor = theme.colors.green[9] + 'E6';
          break;
        case 'warning':
          boxColor = theme.colors.yellow[9] + 'E6';
          break;
        default:
          boxColor = theme.colors.dark[5] + 'E6';
          break;
      }
    } else {
      boxColor = tinycolor(data.boxColor).toRgbString();
    }

    toast.custom(
      (t) => (
        <Box
          sx={{
            backgroundColor: boxColor,
            animation: getAnimation(t.visible, position),
            ...data.style,
          }}
          className={classes.container}
        >
          <Group noWrap spacing={12}>
            {data.icon && (
              <>
                {data.showDuration ? (
                  <RingProgress
                    key={toastKey}
                    size={38}
                    thickness={2}
                    sections={[{ value: 100, color: iconColor }]}
                    style={{ alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start' }}
                    styles={{
                      root: {
                        '> svg > circle:nth-of-type(2)': {
                          animation: `${durationCircle} linear forwards reverse`,
                          animationDuration: `${duration}ms`,
                        },
                        margin: -3
                      },
                    }}
                    label={
                      <Center>
                        <ThemeIcon
                          color={iconColor}
                          radius="xl"
                          size={32}
                          variant={tinycolor(iconColor).getAlpha() < 0 ? undefined : 'light'}
                        >
                          <LibIcon icon={data.icon} fixedWidth color={iconColor} animation={data.iconAnimation} />
                        </ThemeIcon>
                      </Center>
                    }
                  />
                ) : (
                  <ThemeIcon
                    color={iconColor}
                    radius="xl"
                    size={32}
                    variant={tinycolor(iconColor).getAlpha() < 0 ? undefined : 'light'}
                    style={{ alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start' }}
                  >
                    <LibIcon icon={data.icon} fixedWidth color={iconColor} animation={data.iconAnimation} />
                  </ThemeIcon>
                )}
              </>
            )}
            <Stack spacing={0}>
              {data.title && <Text style={{color: iconColor}}>{data.title}</Text>}
              {data.description && (
                <ReactMarkdown
                  components={MarkdownComponents}
                  className={`${!data.title ? classes.descriptionOnly : classes.description} description`}
                >
                  {data.description}
                </ReactMarkdown>
              )}
            </Stack>
          </Group>
        </Box>
      ),
      {
        id: toastId,
        duration: duration,
        position: position,
      }
    );
  });

  return <Toaster />;
};

export default Notifications;
