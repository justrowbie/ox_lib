import React from 'react';
import {createStyles, keyframes, RingProgress, Stack, Text, useMantineTheme} from '@mantine/core';
import {useNuiEvent} from '../../hooks/useNuiEvent';
import {fetchNui} from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type {CircleProgressbarProps} from '../../typings';

// 33.5 is the r of the circle
const progressCircle = keyframes({
  '0%': { strokeDasharray: `0, ${33.5 * 2 * Math.PI}` },
  '100%': { strokeDasharray: `${33.5 * 2 * Math.PI}, 0` },
});

const useStyles = createStyles((theme, params: { position: 'middle' | 'bottom'; duration: number }) => ({
  container: {
    width: '100%',
    height: params.position === 'middle' ? '100%' : '20%',
    bottom: 0,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    '> svg > circle:nth-child(1)': {
      stroke: theme.colors.dark[6] + 'E6',
      strokeWidth: 10,
    },
    // Scuffed way of grabbing the first section and animating it
    '> svg > circle:nth-child(2)': {
      transition: 'none',
      animation: `${progressCircle} linear forwards`,
      animationDuration: `${params.duration}ms`,
      stroke: theme.colors[theme.primaryColor][8],
      boxShadow: theme.colors[theme.primaryColor][8] + ' 0 0 20px 1px',
      filter: 'drop-shadow(0 0 2px ' + theme.colors[theme.primaryColor][8] + ')',
      opacity: 0.9,
      strokeWidth: 10,
    },

  },
  value: {
    textAlign: 'center',
    color: theme.colors[theme.primaryColor][6],
    textShadow: '0 0 10px' + theme.colors[theme.primaryColor][8],
  },
  label: {
    textAlign: 'center',
    color: theme.colors[theme.primaryColor][6],
    textShadow: '0 0 10px' + theme.colors[theme.primaryColor][8],
    height: 25,
  },
  wrapper: {
    marginTop: params.position === 'middle' ? 25 : undefined,
  },
}));

const CircleProgressbar: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [progressDuration, setProgressDuration] = React.useState(0);
  const [position, setPosition] = React.useState<'middle' | 'bottom'>('middle');
  const [value, setValue] = React.useState(0);
  const [label, setLabel] = React.useState('');
  const theme = useMantineTheme();
  const { classes } = useStyles({ position, duration: progressDuration });

  useNuiEvent('progressCancel', () => {
    setValue(99);
    setVisible(false);
  });

  useNuiEvent<CircleProgressbarProps>('circleProgress', (data) => {
    if (visible) return;
    setVisible(true);
    setValue(0);
    setLabel(data.label || '');
    setProgressDuration(data.duration);
    setPosition(data.position || 'middle');
    const onePercent = data.duration * 0.01;
    const updateProgress = setInterval(() => {
      setValue((previousValue) => {
        const newValue = previousValue + 1;
        newValue >= 100 && clearInterval(updateProgress);
        return newValue;
      });
    }, onePercent);
  });

  return (
    <>
      <Stack spacing={0} className={classes.container}>
        <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
          <Stack spacing={0} align="center" className={classes.wrapper}>
            <RingProgress
              size={90}
              thickness={7}
              sections={[{ value: 0, color: theme.primaryColor }]}
              onAnimationEnd={() => setVisible(false)}
              className={classes.progress}
              label={<Text className={classes.value}>{value}%</Text>}
            />
            {label && <Text className={classes.label}>{label}</Text>}
          </Stack>
        </ScaleFade>
      </Stack>
    </>
  );
};

export default CircleProgressbar;
