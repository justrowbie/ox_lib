import { Box, createStyles, Group, Progress, Stack, Text } from '@mantine/core';
import React, { forwardRef } from 'react';
import CustomCheckbox from './CustomCheckbox';
import type { MenuItem } from '../../../typings';
import { isIconUrl } from '../../../utils/isIconUrl';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import LibIcon from '../../../components/LibIcon';

interface Props {
  item: MenuItem;
  index: number;
  scrollIndex: number;
  checked: boolean;
}

const useStyles = createStyles((theme, params: { iconColor?: string }) => ({
  buttonContainer: {
    background: theme.colors[theme.primaryColor][0] + '1A',
    border: '1px solid ' + theme.colors[theme.primaryColor][0] + '33',
    color: theme.colors[theme.primaryColor][0],
    padding: 2,
    height: 60,
    scrollMargin: 8,
    '&:focus': {
      background: theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][9],
      outline: 'none',
      [`& .hoverText`]: {
        color: theme.colors[theme.primaryColor][9],
      },
      [`& .progressBar`]: {
        background: theme.colors[theme.primaryColor][9],
      },
      [`& .progressRoot`]: {
        background: theme.colors[theme.primaryColor][6],
      },
      [`& .checkboxInput`]: {
        background: theme.colors[theme.primaryColor][9],
      },
      [`& .checkboxInner`]: {
        '> svg > path': {
          fill: theme.colors[theme.primaryColor][0],
        },
      },
    },
  },
  iconImage: {
    maxWidth: 32,
  },
  buttonWrapper: {
    paddingLeft: 5,
    paddingRight: 12,
    height: '100%',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    width: 32,
    height: 32,
  },
  icon: {
    fontSize: 20,
    color: params.iconColor || theme.colors[theme.primaryColor][0],
  },
  label: {
    color: theme.colors[theme.primaryColor][0],
    textTransform: 'uppercase',
    fontSize: 12,
    verticalAlign: 'middle',
  },
  chevronIcon: {
    fontSize: 14,
    color: theme.colors[theme.primaryColor][0],
  },
  scrollIndexValue: {
    color: theme.colors[theme.primaryColor][0],
    textTransform: 'uppercase',
    fontSize: 14,
  },
  progressStack: {
    width: '100%',
    marginRight: 5,
  },
  progressLabel: {
    verticalAlign: 'middle',
    marginBottom: 3,
  },
  progressBar: {
    background: theme.colors[theme.primaryColor][0]
  },
  progressRoot: {
    background: theme.colors[theme.primaryColor][0] + '1A'
  }
}));

const ListItem = forwardRef<Array<HTMLDivElement | null>, Props>(({ item, index, scrollIndex, checked }, ref) => {
  const { classes } = useStyles({ iconColor: item.iconColor });

  return (
    <Box
      tabIndex={index}
      className={classes.buttonContainer}
      key={`item-${index}`}
      ref={(element: HTMLDivElement) => {
        if (ref)
          // @ts-ignore i cba
          return (ref.current = [...ref.current, element]);
      }}
    >
      <Group spacing={15} noWrap className={classes.buttonWrapper}>
        {item.icon && (
          <Box className={classes.iconContainer}>
            {typeof item.icon === 'string' && isIconUrl(item.icon) ? (
              <img src={item.icon} alt="Missing image" className={classes.iconImage} />
            ) : (
              <LibIcon
                icon={item.icon as IconProp}
                className={`${classes.icon} hoverText`}
                fixedWidth
                animation={item.iconAnimation}
              />
            )}
          </Box>
        )}
        {Array.isArray(item.values) ? (
          <Group position="apart" w="100%">
            <Stack spacing={0} justify="space-between">
              <Text className={`${classes.label} hoverText`}>{item.label}</Text>
              <Text>
                {typeof item.values[scrollIndex] === 'object'
                  ? // @ts-ignore for some reason even checking the type TS still thinks it's a string
                    item.values[scrollIndex].label
                  : item.values[scrollIndex]}
              </Text>
            </Stack>
            <Group spacing={1} position="center">
              <LibIcon icon="chevron-left" className={`${classes.chevronIcon} hoverText`} />
              <Text className={`${classes.scrollIndexValue} hoverText`}>
                {scrollIndex + 1}/{item.values.length}
              </Text>
              <LibIcon icon="chevron-right" className={`${classes.chevronIcon} hoverText`} />
            </Group>
          </Group>
        ) : item.checked !== undefined ? (
          <Group position="apart" w="100%">
            <Text>{item.label}</Text>
            <CustomCheckbox checked={checked}></CustomCheckbox>
          </Group>
        ) : item.progress !== undefined ? (
          <Stack className={classes.progressStack} spacing={0}>
            <Text className={classes.progressLabel}>{item.label}</Text>
            <Progress
              classNames={{
                bar: `${classes.progressBar} progressBar`,
                root: `${classes.progressRoot} progressRoot`
              }}
              value={item.progress}
              color={item.colorScheme || 'gray.0'}
              // styles={(theme) => ({ root: { backgroundColor: theme.colors.gray[0] + 'A1' } })}
            />
          </Stack>
        ) : (
          <Text>{item.label}</Text>
        )}
      </Group>
    </Box>
  );
});

export default React.memo(ListItem);
