import React from 'react';
import { Box, createStyles, keyframes, Text } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { ProgressbarProps } from '../../typings';

const slideIn = keyframes({
  '0%': { transform: 'translateY(20px)', opacity: 0 },
  '100%': { transform: 'translateY(0)', opacity: 1 },
});

const useStyles = createStyles((theme) => ({
  container: {
    width: 350,
    height: 10,
    borderRadius: theme.radius.sm,
    background: theme.colors[theme.primaryColor][0] + '1A',
    border: '1px solid ' + theme.colors[theme.primaryColor][0] + '33',
    overflow: 'hidden',
  },
  wrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
  },
  bar: {
    height: '100%',
    background: theme.colors[theme.primaryColor][0],
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
    color: theme.colors[theme.primaryColor][0],
    textShadow: theme.shadows.sm,
  },
}));

const Progressbar: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [duration, setDuration] = React.useState(0);
  const [percent, setPercent] = React.useState(0);

  useNuiEvent('progressCancel', () => setVisible(false));

  useNuiEvent<ProgressbarProps>('progress', (data) => {
    setVisible(true);
    setLabel(data.label);
    setDuration(data.duration);
    setPercent(0);

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percentage = Math.min((elapsed / data.duration) * 100, 100);
      setPercent(percentage);
      if (percentage >= 100) clearInterval(interval);
    }, 100);
  });

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
          <Box className={classes.container}>
            <Box 
              className={classes.labelWrapper}
              sx={{
                animation: `${slideIn} 0.5s ease-out`,
              }}  
            >
              <Text className={classes.label}>{label}  {Math.round(percent)}%</Text>
            </Box>
            <Box
              className={classes.bar}
              onAnimationEnd={() => setVisible(false)}
              sx={{
                animation: 'progress-bar linear',
                animationDuration: `${duration}ms`,
              }}
            >

            </Box>
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default Progressbar;
