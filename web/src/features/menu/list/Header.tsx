import { Box, createStyles, Text } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  container: {
    textAlign: 'center',
    background: theme.colors.dark[7],
    opacity: 0.9,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 30,
    height: 40,
    width: 350,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colors.gray[0],
    borderBottom: 'solid',
    borderWidth: 2,
    borderColor: theme.colors.gray[3]
  },
  heading: {
    fontSize: 14,
    color: theme.colors.gray[3],
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
