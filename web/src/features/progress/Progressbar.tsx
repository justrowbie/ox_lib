import React from 'react';
import { Box, createStyles, keyframes, Text } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { ProgressbarProps } from '../../typings';

const slideIn = keyframes({
  '0%': { transform: 'translateX(-20px)', opacity: 0 },
  '100%': { transform: 'translateY(0)', opacity: 1 },
});

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
  },
  container: {
    width: 350,
    height: 20,
    background: theme.colors.dark[9] + 'CC',
    overflow: 'hidden',
  },
  barWrapper: {
    width: 350,
    height: 20,
    position: 'absolute',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  percent: {
    position: 'relative',
    textAlign: 'center',
    width: 30,
    height: 20,
    marginLeft: -30,
    fontSize: 12,
    fontWeight: 500,
    color: theme.colors.dark[0],
    background: theme.colors.dark[9],
    transition: 'opacity 0.5s ease',
  },
  bar: {
    height: '100%',
    background: theme.colors.dark[0],
  },
  labelWrapper: {
    position: 'absolute',
    display: 'flex',
    width: 350,
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    maxWidth: 350,
    height: 30,
    padding: 5,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 30,
    textTransform: 'uppercase',
    color: theme.colors.dark[0],
    textShadow: theme.shadows.sm,
  },
}));

const Progressbar: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [duration, setDuration] = React.useState(0);
  const [value, setValue] = React.useState(0);

  useNuiEvent('progressCancel', () => {
    setValue(99);
    setVisible(false);
  });

  useNuiEvent<ProgressbarProps>('progress', (data) => {
    setVisible(true);
    setLabel(data.label);
    setDuration(data.duration);
    setValue(0);
    
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
      <Box className={classes.wrapper} sx={{ display: visible ? 'flex' : 'none' }}>
        <ScaleFade visible={visible} onExitComplete={() => {setVisible(false); fetchNui('progressComplete')}}>
          <Box className={classes.container}>
            <Box 
              className={classes.labelWrapper}
              sx={{
                animation: `${slideIn} 0.5s ease-out`,
              }}
            >
              <Text className={classes.label}>{label}</Text>
            </Box>
            <Box className={classes.barWrapper}>
              <Box
                className={classes.bar}
                onAnimationEnd={() => setVisible(false)}
                sx={{
                  display: visible ? 'flex' : 'none',
                  animation: 'progress-bar linear',
                  animationDuration: `${duration}ms`,
                }}
              ></Box>
              <Text
                className={classes.percent}
              >{value}%</Text>
            </Box>
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default Progressbar;
