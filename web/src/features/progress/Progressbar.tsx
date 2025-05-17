import React from 'react';
import { Box, createStyles, Text, Grid } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { ProgressbarProps } from '../../typings';
import { relative } from 'path';

const useStyles = createStyles((theme) => ({
  container: {
    maxWidth: 350,
    width: 350,
    height: 10,
    background: theme.colors.dark[5] + 'E6',
    overflow: 'hidden',
    borderRadius: 2,
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
    backgroundColor: theme.colors.dark[5] + 'E6',
    background: theme.colors[theme.primaryColor][5],
    backgroundSize: "2em 2em",
    backgroundPosition: "center",
    borderRadius: 2,
    boxShadow: theme.colors[theme.primaryColor][5] + ' 0 0 20px 1px',
  },
  labelWrapper: {
    width: 360,
    height: 50,
    marginTop: -35,
    fontSize: 14,
    position: 'absolute',
    display: 'flex',
  },
  label: {
    textAlign: 'left',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: theme.colors.gray[0],
    textShadow: '0 0 5px' + theme.colors[theme.primaryColor][5],
  },
  value: {
    textAlign: 'right',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: theme.colors.gray[0],
    textShadow: '0 0 5px' + theme.colors[theme.primaryColor][5],
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
    if (visible) return;
    setVisible(true);
    setValue(0);
    setLabel(data.label);
    setDuration(data.duration);
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
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
          <Box className={classes.container}>
            <Box
              className={classes.bar}
              onAnimationEnd={() => setVisible(false)}
              sx={{
                animation: 'progress-bar linear',
                animationDuration: `${duration}ms`,
                value: 0,
              }}
            >
              <Grid className={classes.labelWrapper}>
                <Grid.Col span={10}><Text className={classes.label}>{label}</Text></Grid.Col>
                <Grid.Col span={2}><Text className={classes.value}>{value}%</Text></Grid.Col>
              </Grid>
            </Box>
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default Progressbar;
