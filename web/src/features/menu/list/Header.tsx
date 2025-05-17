import { Box, createStyles, Text } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  container: {
    textAlign: 'center',
    background: theme.colors.dark[5] + 'E6',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 30,
    height: 40,
    width: 350,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '2px solid ' + theme.colors[theme.primaryColor][5],
    boxShadow: theme.colors[theme.primaryColor][5] + ' 0 5px 5px -5px',
  },
  heading: {
    fontSize: 14,
    color: theme.colors[theme.primaryColor][5],
    textShadow: '0 0 10px' + theme.colors[theme.primaryColor][5],
    textTransform: 'uppercase',
    fontWeight: 600,
  },
}));

const Header: React.FC<{ title: string }> = ({ title }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Text className={classes.heading}>{title}</Text>
    </Box>
  );
};

export default React.memo(Header);
